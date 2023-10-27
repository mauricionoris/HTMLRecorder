# HTMLRecorder

HTMLRecorder is a lightweight web-based screen recording and playback tool for capturing user interactions on web pages. It allows you to record a sequence of actions performed on a web page and then play them back to reproduce the same interactions, making it a useful tool for testing and debugging web applications.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Record user interactions on web pages, including clicks, form submissions, and more.
- Save recorded interactions as HTML files.
- Play back recorded interactions to automate repetitive tasks or test web applications.
- Lightweight and easy to use.

## Getting Started

These instructions will help you get started with HTMLRecorder.

### Installation

To use HTMLRecorder, you can include the necessary JavaScript file in your web page:

```html
<script src="path/to/HTMLRecorder.js"></script>
```
Usage
To record and play back user interactions, follow these basic steps:

Include the HTMLRecorder JavaScript file in your web page.

Create a new instance of HTMLRecorder.

```javascript
const recorder = new HTMLRecorder();
//Start recording user interactions:
recorder.startRecording();
```

Perform the desired actions on your web page, and HTMLRecorder will capture them.

Stop recording when you're done:

```javascript

recorder.stopRecording();
```

You can save the recorded interactions to an HTML file:


```javascript

recorder.saveRecording('recorded_interactions.html');
```



To play back the recorded interactions:

```javascript

recorder.loadRecording('recorded_interactions.html');
recorder.playRecording();
```

Contributing
We welcome contributions to HTMLRecorder. To contribute, please follow these steps:

Fork the repository.

Create a new branch for your feature or bug fix:

sh
Copy code
git checkout -b feature/my-feature
Make your changes and commit them with clear and concise commit messages.

## Push your branch to your forked repository.

Create a pull request to the main repository's main branch.

We will review your contributions and merge them if they align with the project's goals.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
