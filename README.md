# Grammar Checker Extension

A Chrome/Edge extension designed to provide real-time grammar and spelling corrections across various websites. While fully functional on supported platforms, integration with Google Docs is currently under development.

*Note: This extension is not yet published in the Chrome/Edge Web Store and is undergoing review for publication.*

## Table of Contents

- [Features](#features)
- [Supported Websites](#supported-websites)
- [Installation](#installation)
  - [Manual Installation (For Developers)](#manual-installation-for-developers)
- [Usage](#usage)
- [Permissions](#permissions)
- [Configuration](#configuration)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Features

- **Real-time Grammar and Spelling Correction:** Automatically detects and suggests corrections for grammatical and spelling errors on supported websites.
- **Seamless Integration:** Easily accessible "Correct Text" button appears near your text selections.
- **Difference Modal:** After correction, a modal displays the differences between the original and corrected text using the integrated Diff library.
- **User-Friendly Interface:** Intuitive UI elements that blend with the design of supported websites.
- **Secure Token Management:** Ensures that authorization tokens are handled securely.
- **Responsive Design:** Adapts to various screen sizes and resolutions for optimal user experience.

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
   - Navigate to a supported website and verify that the "Correct Text" button appears and functions as expected.

## Usage

1. **Open a Supported Website:**
   - Navigate to the textarea of any website.

2. **Type Text:**
   - Type the text you want to correct.

3. **Click "Correct Text" Button:**
   - A floating "Correct Text" button will appear in the editable area.
   - Click the button to process the selected text.

4. **View Corrections:**
   - The selected text will be replaced with the corrected version.
   - A modal will display the differences between the original and corrected text.

*Note: Integration with Google Docs is under development. Once available, detailed usage instructions for Google Docs will be provided.*

## Permissions

The extension requires the following permissions:

- **Active Tab:** To interact with the currently active tab where supported websites are open.
- **Scripting:** To inject and execute scripts within supported websites for grammar correction.
- **Storage:** To securely store and retrieve authorization tokens.

These permissions are necessary for the extension to function correctly and provide grammar correction services across supported platforms.

## Configuration

### Setting Up the Authorization Token

The extension interacts with a backend API to perform grammar and spelling corrections. To ensure secure communication, an authorization token is required.

1. **Obtain an Authorization Token:**
   - Contact the backend service provider or refer to their documentation to obtain an API token.

2. **Store the Token Securely:**
   - The extension uses Chrome's `storage.local` API to store the token securely.
   - Upon installation, the background script initializes the token. Implement a user interface or method to input and update the token as needed.

3. **Background Script (`background.js`):**

   ```javascript
   // background.js

   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "get-token") {
        sendResponse({ token: "your_secure_token_123" });
    }
    });
   ```

4. **Updating the Token:**
   - Implement a user interface (e.g., a popup or options page) to allow users to update their authorization token securely.

## Roadmap

Future developments and enhancements planned for the Grammar Checker Extension include:

1. **Google Docs Integration:**
   - Develop seamless integration with Google Docs, allowing users to correct text directly within their documents.

2. **Expanded Website Support:**
   - Extend grammar and spelling correction capabilities to additional websites and platforms.

3. **Enhanced UI/UX:**
   - Improve the styling and responsiveness of UI elements for a better user experience.

4. **Advanced Correction Features:**
   - Incorporate advanced grammar rules and context-aware suggestions.

5. **User Settings:**
   - Provide customizable settings for users to tailor the extension's behavior to their preferences.

6. **Performance Optimization:**
   - Enhance the extension's performance to ensure minimal impact on website loading times and responsiveness.

7. **Comprehensive Testing:**
   - Conduct extensive testing across various scenarios to ensure reliability and performance.

8. **Publication to Chrome Web Store:**
   - Complete the review process and publish the extension for public use.

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

## Acknowledgments

- Inspired by [Grammarly](https://www.grammarly.com/) for its seamless integration and user-friendly interface.
- Utilizes the [Diff library](https://github.com/kpdecker/jsdiff) for generating text differences.

---