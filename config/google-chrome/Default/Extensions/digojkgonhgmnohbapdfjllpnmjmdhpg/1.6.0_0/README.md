ProctorExam Extension for Chrome
================================

This extension allows you to use the screen sharing support in Chrome with the
Proctorexam webRTC client.

The [manifest.json][manifest] is set to let this plugin work only in
conjunction with `*.proctorexam.com` pages, the extension won't work with any
other website.

[manifest]: https://developer.chrome.com/extensions/manifest

## Setup

To build the extension use:

    yarn build

To run the browser with the extension (for testing), use:

    yarn web-ext run --target chromium

This should also auto-reload the extension as you rebuild changes.

## Browser Support

Google Chrome (version 72+) only.

## License

This is a variation of [the extension][mkext] created by [Muaz Khan][mkgh] with
some tweaks to make it more suitable for use with the ProctorExam API. It also
publishes events to the ProctorExam tab when tabs are opened, updated or closed
in order to track the browsing behaviour of a user during an exam.

It is derived from the [OpenTok plugin][ot]

Released under the [MIT license][licence].

[ot]: http://tokbox.com/opentok/libraries/client/js/
[mkext]: https://github.com/muaz-khan/WebRTC-Experiment/tree/master/Chrome-Extensions/desktopCapture
[mkgh]: https://github.com/muaz-khan
[licence]: http://opensource.org/licenses/MIT
