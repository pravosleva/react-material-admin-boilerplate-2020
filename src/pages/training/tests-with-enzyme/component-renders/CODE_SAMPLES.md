## The component renders

For this, we’ll make use of shallow render. Shallow rendering allows us to check if the render method of the component gets called — that’s what we want to confirm here because that’s the proof we need that the component renders.

```js
it("renders", () => {
  shallow(<Todo />);
});
```