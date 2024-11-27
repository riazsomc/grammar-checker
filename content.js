// Track processed elements and iframes to prevent duplicate processing
const processedElements = new WeakSet();
const processedIframes = new WeakSet();

// Function to check if an element is editable
function isEditable(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) return false;
    const tag = node.tagName.toLowerCase();
    const isContentEditable =
        node.isContentEditable && node.getAttribute("contenteditable") !== "false";
    const isTextarea = tag === "textarea";

    if (isContentEditable || isTextarea) {
        // Check if any ancestor is also editable
        let parent = node.parentElement;
        while (parent) {
            if (
                (parent.isContentEditable && parent.getAttribute("contenteditable") !== "false") ||
                parent.tagName.toLowerCase() === "textarea"
            ) {
                return false; // Parent is also editable, so skip this node
            }
            parent = parent.parentElement;
        }
        return true; // Node is editable and no ancestor is editable
    }
    return false;
}

// Function to get the absolute bounding rect of an element, accounting for scrolls and offsets
function getAbsoluteBoundingRect(el) {
    const doc = el.ownerDocument;
    const win = doc.defaultView;
    const body = doc.body;
    const html = doc.documentElement;

    let rect = el.getBoundingClientRect();
    let clientLeft = html.clientLeft || body.clientLeft || 0;
    let clientTop = html.clientTop || body.clientTop || 0;
    let scrollLeft = win.pageXOffset || html.scrollLeft || body.scrollLeft;
    let scrollTop = win.pageYOffset || html.scrollTop || body.scrollTop;

    let x = rect.left + scrollLeft - clientLeft;
    let y = rect.top + scrollTop - clientTop;

    // Account for frames/iframes
    let frameElement = win.frameElement;
    while (frameElement) {
        const frameRect = frameElement.getBoundingClientRect();
        x += frameRect.left;
        y += frameRect.top;

        const parentWin = frameElement.ownerDocument.defaultView;
        scrollLeft = parentWin.pageXOffset || parentWin.document.documentElement.scrollLeft || 0;
        scrollTop = parentWin.pageYOffset || parentWin.document.documentElement.scrollTop || 0;

        x += scrollLeft;
        y += scrollTop;

        frameElement = parentWin.frameElement;
    }

    return {
        left: x,
        top: y,
        width: rect.width,
        height: rect.height,
    };
}

// Function to attach the correction button to an editable element
function attachCorrectionButton(element, doc = document) {
    if (processedElements.has(element) || element.dataset.hasCorrectionButton) return;

    // Mark the element as processed
    processedElements.add(element);
    element.dataset.hasCorrectionButton = "true";

    // Check if the element is visible
    const style = window.getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden") {
        console.log("Skipping hidden element:", element);
        return;
    }

    // Create the correction button
    const button = document.createElement("button");
    button.textContent = "Correct Text";
    button.className = "grammar-correction-button";
    button.style.position = "absolute";
    button.style.zIndex = "100000"; // Increased z-index to ensure visibility
    button.style.cursor = "pointer";

    // Append the button to the top-level document body
    document.body.appendChild(button);

    // Position the button at the bottom-right corner of the editable area
    const positionButton = () => {
        const absoluteRect = getAbsoluteBoundingRect(element);

        // Align the button's bottom-right corner with the editable area's bottom-right corner
        button.style.left = `${absoluteRect.left + absoluteRect.width - button.offsetWidth}px`;
        button.style.top = `${absoluteRect.top + absoluteRect.height - button.offsetHeight}px`;
    };

    // Initial positioning
    positionButton();

    // Reposition on window and element events
    const updatePosition = () => positionButton();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    // Observe changes to the element's size or position
    const resizeObserver = new ResizeObserver(() => {
        positionButton();
    });
    resizeObserver.observe(element);

    // Add click event to the button
    button.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const originalText = getElementText(element);
        console.log("Original Text:", originalText);

        // Call your API
        try {
            const response = await fetch("https://bot.w3datanet.com/grammar-checker/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: originalText }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("API Response:", data);
                if (data.corrected_text && data.corrected_text !== originalText) {
                    setElementText(element, data.corrected_text);
                    console.log("Text corrected.");
                } else {
                    alert("No corrections found.");
                }
            } else {
                console.error("API Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error calling API:", error);
        }
    });
}

// Function to get text from an editable element
function getElementText(element) {
    const tag = element.tagName.toLowerCase();
    if (tag === "textarea") {
        return element.value;
    } else if (element.isContentEditable) {
        return element.innerText;
    }
    return "";
}

// Function to set text in an editable element
function setElementText(element, text) {
    const tag = element.tagName.toLowerCase();
    if (tag === "textarea") {
        element.value = text;
    } else if (element.isContentEditable) {
        element.innerText = text;
    }
}

// Function to attach to editable elements within iframes
function attachToIframeEditables() {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
        if (processedIframes.has(iframe)) return; // Skip already processed iframes
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc) {
                processedIframes.add(iframe); // Mark the iframe as processed
                const editableElements = iframeDoc.querySelectorAll(
                    '[contenteditable="true"], textarea'
                );
                editableElements.forEach((element) => {
                    if (isEditable(element) && !processedElements.has(element)) {
                        console.log("Attaching to editable element in iframe:", element);
                        attachCorrectionButton(element, iframeDoc);
                    }
                });

                // Monitor dynamic changes in the iframe
                const iframeObserver = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                if (isEditable(node) && !processedElements.has(node)) {
                                    console.log("Detected new editable element in iframe:", node);
                                    attachCorrectionButton(node, iframeDoc);
                                }
                                node.querySelectorAll &&
                                    node
                                        .querySelectorAll('textarea, [contenteditable="true"]')
                                        .forEach((child) => {
                                            if (isEditable(child) && !processedElements.has(child)) {
                                                console.log(
                                                    "Detected new editable element in iframe:",
                                                    child
                                                );
                                                attachCorrectionButton(child, iframeDoc);
                                            }
                                        });
                            }
                        });
                    });
                });
                iframeObserver.observe(iframeDoc.body, { childList: true, subtree: true });
            }
        } catch (e) {
            console.error("Cannot access iframe:", e);
        }
    });
}

// MutationObserver to handle dynamic DOM changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                // If an iframe is added, attempt to attach to its editable elements
                if (node.tagName.toLowerCase() === "iframe") {
                    attachToIframeEditables();
                }

                // Check if the node is an editable element
                if (isEditable(node) && !processedElements.has(node)) {
                    console.log("Detected new editable element:", node);
                    attachCorrectionButton(node);
                }

                // Check for editable elements within the added node
                node.querySelectorAll &&
                    node
                        .querySelectorAll('textarea, [contenteditable="true"]')
                        .forEach((child) => {
                            if (isEditable(child) && !processedElements.has(child)) {
                                console.log("Detected new editable element:", child);
                                attachCorrectionButton(child);
                            }
                        });
            }
        });
    });
});

// Start observing the document
observer.observe(document.body, { childList: true, subtree: true });

// Attach to editable elements in the main document
document.querySelectorAll("textarea, [contenteditable='true']").forEach((element) => {
    if (isEditable(element) && !processedElements.has(element)) {
        console.log("Attaching to existing editable element:", element);
        attachCorrectionButton(element);
    }
});

// Attach to editable elements within iframes
attachToIframeEditables();
