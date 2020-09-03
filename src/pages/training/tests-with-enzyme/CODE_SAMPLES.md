## Testing with Enzyme

We need to install the packages before we can start testing. Time to fire up the terminal!

```bash
yarn add -D enzyme enzyme-adapter-react-16
yarn add -D @types/enzyme
```

Inside the `src` directory, create a file called setupTests.js. This is what we’ll use to configure Enzyme’s adapter.

```js
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
```

Now we can start writing our tests! We want to test four things:

- That the component renders
- That the initial to-dos get displayed when it renders
- That we can create a new to-do and get back three others
- That we can delete one of the initial to-dos and have only one to-do left

In your src directory, create a folder called __tests__ and create the file where you’ll write your Todo component’s tests in it. Let’s call that file Todo.test.js.

With that done, we can import the packages we need and create a describe block where we’ll fill in our tests.

```js
import React from "react";
import { shallow, mount } from "enzyme";
import Todo from "../Todo";

describe("Todo", () => {
  // Tests will go here using `it` blocks
});
```