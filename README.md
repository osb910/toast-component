# Toast Component Project

An implementation of a `<Toast>` message component.

![Screen recording showing 3 toast messages popping up from user input](./docs/toast-demo.gif)

## Exercise 5: Keyboard and screen reader support

Our component so far works pretty well for sighted mouse users, but the experience isn't as great for everyone else.

In this exercise, we'll improve the experience for two different groups of people:

- Sighted keyboard users
- Users who use a screen reader

### 5.1: Keyboard users

Let's try something. Pretend that you don't have a mouse or trackpad. Using the keyboard alone, can you create and dismiss a toast message?

**Give it a shot now, in browser.**

**How do I do this?** You'll use the “Tab” key to move focus between interactive elements. You can hold "Shift" and hit "Tab" to move backwards. In order to dismiss the toasts, you'll need to keep tabbing until your focus reaches the close button. Then, hit "Enter".

> NOTE: If you're using Safari or Firefox on MacOS, you'll need to toggle a system setting to allow tabs to focus on buttons. Read more here: https://www.scottohara.me/blog/2014/10/03/link-tabbing-firefox-osx.html

---

Well, what did you think?

I found that this experience was pretty annoying. It was difficult to get the focus to reach the close buttons.

When we built a modal from scratch, we moved focus to within the modal, and trapped it there. This is a good idea for modals (which are urgent and blocking), but it's not the right approach for toasts (which are non-urgent and passive). Moving the user's focus is a pretty aggressive move, and not something we should do unless it's necessary.

**So, here's what we should do:** Let's wire up the "Escape" key to automatically dismiss all toasts.

That way, we aren't interrupting the user. They can read the messages in their own time, and hit "Escape" to dismiss them, without them needing to fuss with tab navigation at all.

**Acceptance Criteria:**

- Hitting the "Escape" key should dismiss all toasts
- You'll want to do this with a `useEffect` hook, but it's up to you to decide which component should bear this responsibility.

### 5.2: Screen reader users

A screen reader is a piece of software that narrates the page. They're primarily used by folks who are blind or have low vision (though screen readers are also useful for folks with cognitive disabilities).

Understanding how to use screen readers is a bit beyond the scope of this course, so I won't ask you to test things with a screen reader.

Let's imagine we reach out to an accessibility specialist, and they do us the favor of converting our HTML to be screen-reader-friendly.

**Here are the changes we need to make:**

```diff
<ol
  class="ToastShelf_wrapper"
+ role="region"
+ aria-live="polite"
+ aria-label="Notification"
>
  <li class="ToastShelf_toastWrapper">
    <div class="Toast_toast Toast_error">
      <div class="Toast_iconContainer">
        <!-- Variant SVG icon -->
      </div>
      <p class="Toast_content">
+       <div class="VisuallyHidden_wrapper">
+         error -
+       </div>
        Something went wrong! Please contact customer support
      </p>
      <button
        class="Toast_closeButton"
+       aria-label="Dismiss message"
+       aria-live="off"
      >
        <!-- Close SVG icon -->
-       <div class="VisuallyHidden_wrapper">
-         Dismiss message
-       </div>
      </button>
    </div>
  </li>
</ol>
```

**NOTE: This diff shows the _HTML_.** Pretend that this is an HTML snippet given to you by an accessibility consultant who doesn't know React. Your job is to integrate their suggestions into our React components.

**Curious about these changes?** In the solution video, I'll share exactly why each of these changes are necessary. I realize it probably seems pretty arbitrary right now 😅 but all will be explained in the video.

**Acceptance Criteria:**

- The `<ol>` should have the specified role / aria tags
- The toast's content should be prefixed with the variant, using the `VisuallyHidden` component.
  - _NOTE:_ The diff above shows an _error_ toast, but the prefix should be dynamic, based on the variant.
- The “Dismiss message” content in the close button should be moved to an `aria-label`. `aria-live` should also be set to "off".

---

## Exercise 6: Extracting a custom hook

Whew! We've done quite a bit with this lil’ `Toast` component!

In the previous exercise, we added an “escape” keyboard shortcut, to dismiss all toasts in a single keystroke. This is a very common pattern, and it requires a surprising amount of boilerplate in React.

Let's build a **custom reusable hook** that makes it easy to reuse this boilerplate to solve future problems.

There are lots of different ways to tackle this, and there's no right or wrong answer, but here's one idea to get you started: what if we create a new custom hook called `useEscapeKey`?

```js
useEscapeKey(() => {
  // Code to dismiss all toasts
});
```

**This is an open-ended exercise.** Feel free to experiment with different APIs and see what works best for you!

**Acceptance Criteria:**

- We want to create a new generic hook that makes it easy to listen for `keydown` events in React. It's up to you to come up with the best “consumer experience”.
- Because this is a generic hook, it shouldn't be stored with the `ToastProvider` component. Create a new `/src/hooks` directory, and place your new hook in there.
- The `ToastProvider` component should use this new hook.
- **Make sure there are no ESLint warnings.**
  - In VSCode, ESLint warnings are shown as squiggly yellow underlines. You can view the warning by hovering over the underlined characters, or by opening the “Problems” tab (`⌘` + `Shift` + `M`, or Ctrl + `Shift` + `M`).
