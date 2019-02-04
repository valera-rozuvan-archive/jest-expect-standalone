# Jest Expect Standalone

Jest Expect Standalone Library. Use the
[expect](https://github.com/facebook/jest/tree/master/packages/expect) package
from the [facebook/jest](https://github.com/facebook/jest) project in the
browser without any troubles.

## What and why

Previously, the `expect` library was maintained over at
[mjackson/expect](https://github.com/mjackson/expect). However, the author decided
to donate the project over to `facebook/jest`. See more information about this
process in
[facebook/jest/issues/1679](https://github.com/facebook/jest/issues/1679).
Before the donation, the `expect` library was hosted on various CDNs, and you
could easily include it as a script tag in some HTML file. It was usually done
for quick testing/prototyping of code in online tools such as
[JSFiddle](https://jsfiddle.net/), [JS Bin](https://jsbin.com/), or
[Plunker](https://plnkr.co/). One good example of `expect` usage for educational
purposes is in the series of lectures
[Getting Started with Redux - Egghead](https://egghead.io/courses/getting-started-with-redux)
by [Dan Abramov](https://github.com/gaearon).

After the handover of `expect` library, it became almost impossible to quickly
include it in HTML code as a script tag. One possibility of how it can be achieved
is illustrated in the JS Bin sample
[jsbin/nucimeceve](https://jsbin.com/nucimeceve/edit?html,console). However, the
method is cumbersome, and the result is slow. This is partly because
`facebook/jest` uses `expect` as an internal dependency, and does not
bundle it as a standalone UMD module.

This project intends to make available `expect` library as a standalone library
for easy inclusion inside the browser via a script tag. `jest-expect-standalone`
will be made available via CDN, and updated each time `facebook/jest` project
updates their internal `expect` library.

## Usage

Include `jest-expect-standalone` as a script tag, and you will have the library
available via `window.expect`.

```
<script src="https://unpkg.com/jest-expect-standalone@latest/dist/expect.min.js"></script>
```

See sample JS Bin [https://jsbin.com/tetujatajo/1/](https://jsbin.com/tetujatajo/1/edit?html,console).

Or copy and paste the following HTML code in your editor, and hack away:

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Running jest-expect-standalone</title>
  <script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/jest-expect-standalone@latest/dist/expect.min.js">
  </script>
  <script>
    function domReady(f) {
      (/in/.test(document.readyState)) ?
        setTimeout(function () { this.domReady(f); }, 9) :
        f();
    }

    function runTests() {
      console.log('-----------------------------------');

      try {
        expect(true).toEqual(false);
        console.log('Test #1 passed!');
      } catch (err) {
        console.log('Test #1 failed!');
        console.log(err.message);
      }

      console.log('-----------------------------------');

      try {
        expect(2).toEqual(2);
        console.log('Test #2 passed!');
      } catch (err) {
        console.log('Test #2 failed!');
        console.log(err.message);
      }
      
      console.log('-----------------------------------');
    }
    
    domReady(runTests);
  </script>
</head>
<body></body>
</html>
```

## Building & running tests

To hack away on this project, clone this repository and change to it's root directory.
After installing NPM modules with `npm install`, you have the following commands available:

```
npm run build
npm run test
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.

## Enjoy ;)
