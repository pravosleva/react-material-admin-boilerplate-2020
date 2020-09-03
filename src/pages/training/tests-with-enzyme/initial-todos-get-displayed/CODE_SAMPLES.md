## Initial to-dos get displayed

Here is where we’ll make use of the mount method, which allows us to go deeper than what shallow gives us. That way, we can check the length of the to-do items.

```js
it("displays initial to-dos", () => {
  const wrapper = mount(<Todo />);
  expect(wrapper.find("li")).toHaveLength(2);
});
```