import { expect } from '../vendor/expect/build-es5/index.js';
import * as expectPackageJson from '../vendor/expect/package.json';

interface ICustomWidnow extends Window {
  __jest_expect_version: string;
  expect: any;
}

(window as ICustomWidnow).__jest_expect_version = expectPackageJson.version;
console.log('window.__jest_expect_version = ' + (window as ICustomWidnow).__jest_expect_version);
(window as ICustomWidnow).expect = expect;

export default expect;
