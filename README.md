```markdown
# Grammar Checker Extension

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repo-blue.svg)](https://github.com/riazsomc/grammar-checker)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A Chrome/Edge extension that provides real-time grammar and spelling corrections across various websites. Currently under development to integrate seamlessly with Google Docs.

**Note:** While the extension is fully functional on several websites, integration with Google Docs is still in progress.

## Table of Contents

- [Features](#features)
- [Current Capabilities](#current-capabilities)
- [Installation](#installation)
  - [Manual Installation (For Developers)](#manual-installation-for-developers)
- [Usage](#usage)
- [Configuration](#configuration)
- [Permissions](#permissions)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Roadmap](#roadmap)
- [Acknowledgments](#acknowledgments)

## Features

- **Real-time Grammar and Spelling Correction:** Detects and suggests corrections for grammatical and spelling errors as you type.
- **Cross-Website Functionality:** Works seamlessly on multiple websites, enhancing your writing across the web.
- **Difference Highlighting:** Utilizes the included Diff library to showcase differences between original and corrected text.
- **User-Friendly Interface:** Intuitive UI elements that are easy to interact with and non-intrusive.
- **Secure Token Management:** Handles authorization tokens securely to ensure safe interactions with backend services.
- **Responsive Design:** Adapts to various screen sizes and resolutions for consistent performance.

## Current Capabilities

- **Functioning on Multiple Websites:** The extension successfully integrates with and provides grammar corrections on several popular websites (e.g., blogs, forums, email platforms).
- **Integrated Diff Library:** The Diff library is included and operational, allowing for accurate difference highlighting between texts.
- **Under Development for Google Docs Integration:** Efforts are underway to ensure seamless functionality within Google Docs, addressing challenges related to Shadow DOMs and dynamic content.

## Installation

### Manual Installation (For Developers)

Since the extension is not yet published in the Chrome/Edge Web Store and is currently under review, you can install it manually for testing and development purposes.

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/riazsomc/grammar-checker.git
   ```

2. **Navigate to the Directory:**

   ```bash
   cd grammar-checker
   ```

3. **Load the Extension in Chrome:**

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" by toggling the switch in the top-right corner.
   - Click "Load unpacked" and select the cloned repository folder.

4. **Verify Installation:**

   - The extension should now appear in your list of installed extensions.
   - Visit supported websites to see the "Correct Text" button in action.
   - **Note:** Integration with Google Docs is still in progress and may not function as expected at this stage.

## Usage

1. **Navigate to a Supported Website:**

   Open any website where the extension is active (e.g., blogs, forums, email platforms).

2. **Type Text:**

   Typet the text you want to check for grammatical or spelling errors.

3. **Click the "Correct Text" Button:**

   - A floating "Correct Text" button will appear near your selection.
   - Click the button to process the selected text.

4. **View Corrections:**

   - The extension will replace the selected text with the corrected version.
   - A modal will display the differences between the original and corrected text, highlighting additions and deletions.

## Configuration

### Setting Up the Authorization Token

The extension communicates with a backend API to perform grammar and spelling corrections. To ensure secure communication, an authorization token is required.

1. **Obtain an Authorization Token:**
   - Contact the backend service provider or refer to their documentation to obtain an API token.

2. **Store the Token Securely:**
   - The extension uses Chrome's `storage.local` API to store the token securely.
   - Upon installation, the background script initializes the token. You may need to implement a user interface or method to input and update the token.

3. **Background Script (`background.js`):**

   ```javascript
   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "get-token") {
        sendResponse({ token: "your_secure_token_123" });
    }
    });
   ```

4. **Updating the Token:**
   - Implement a user interface (e.g., a popup or options page) to allow users to update their authorization token securely.

## Permissions

The extension requires the following permissions:

- **Active Tab:** To interact with the currently active tab where text editing is taking place.
- **Scripting:** To inject and execute scripts within web pages for grammar correction.
- **Storage:** To securely store and retrieve authorization tokens.

These permissions are necessary for the extension to function correctly and provide grammar correction services across various websites.

## Contributing

Contributions are welcome! If you'd like to contribute to the Grammar Checker Extension, please follow these steps:

1. **Fork the Repository:**
   - Click on the "Fork" button at the top-right corner of the repository page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/riazsomc/grammar-checker.git
   ```

3. **Create a Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes:**
   - Implement your feature or fix the issue.

5. **Commit Your Changes:**

   ```bash
   git commit -m "Add feature: your feature description"
   ```

6. **Push to Your Fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request:**
   - Navigate to the original repository and click "New pull request".
   - Describe your changes and submit the pull request.

### Code of Conduct

Please adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) when contributing to this project.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions, issues, or feature requests, please open an issue on the [GitHub repository](https://github.com/riazsomc/grammar-checker/issues).

---

## Roadmap

Below are the planned features and improvements for the Grammar Checker Extension:

1. **Google Docs Integration:**
   - **Shadow DOM Traversal:** Accurately locate the Google Docs editor container within nested Shadow DOMs.
   - **Button Injection:** Inject the "Correct Text" button within Google Docs for seamless integration.
   - **Event Handling:** Implement robust event listeners to capture and process text selections without losing focus.

2. **Enhanced UI/UX:**
   - **Loading Indicators:** Show a spinner or progress indicator during API calls.
   - **Difference Modal Enhancements:** Improve the modal's design and functionality for better user experience.
   - **Accessibility Improvements:** Ensure keyboard navigation and screen reader support.

3. **Security Enhancements:**
   - **Secure Token Management:** Implement secure methods for storing and retrieving authorization tokens, possibly via OAuth.
   - **Data Privacy:** Ensure that user data is handled securely and in compliance with privacy standards.

4. **Performance Optimization:**
   - **Efficient DOM Manipulation:** Optimize script injection and DOM interactions to minimize performance overhead.
   - **Debounce Event Listeners:** Prevent excessive function calls during rapid events like `keyup` or `mousemove`.

5. **Testing and Debugging:**
   - **Comprehensive Testing:** Conduct extensive testing across different websites and scenarios to ensure reliability.
   - **Bug Fixes:** Address any issues identified during testing to enhance stability.

6. **Publication:**
   - **Chrome Web Store Submission:** Prepare and submit the extension for review and publication in the Chrome Web Store.
   - **Marketing Materials:** Create promotional materials, including screenshots and videos, to showcase the extension's capabilities.

## Acknowledgments

- Inspired by [Grammarly](https://www.grammarly.com/) for its seamless integration and user-friendly interface.
- Utilizes the [Diff library](https://github.com/kpdecker/jsdiff) for generating text differences.
- Special thanks to the open-source community for providing valuable resources and tools that made this project possible.

---