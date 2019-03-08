# 1. In Jest, what are the differences between describe() and it() globals, and what are good uses for them?

## `describe()`

**`describe()`** groups together several tests in a test suite based on some category or similarity in order to keep all the tests organized. `describe()`, as its name suggests, would _describe_ what aspect of a program is being tested.

## `it()`

Occurrences of **`it()`** contain individual test items. They are to be defined as testing specific behaviors. Conveniently enough, uses of `it()` can be articulated in a way similar to natural English: _"it" -> "should do some defined task/action or behave in a certain way"_.

# 2. What is the point of Test Driven Development? What do you think about this approach?

The idea behind **test driven development (TDD)** is to have a greater assurance (_not 100%_ though - there has to be a _test scope_ because testing ideas can potentially be endless) that a piece of software will pass requirements.

It's like setting up your route in a GPS system - you establish the criteria (tests) for passable software, and then your GPS system (the tests) will alert you so that you don't waste time and energy going in the wrong direction.

This approach would have many benefits **if** utilized in a _well-organized_ and _well-defined manner_. Tests should of course not have false positives nor false negatives too to avoid the types of delays that TDD seeks to prevent

# 3. Mention three types of automated tests.

- **Unit tests** - these are fast, small-scale tests (that can often be written by developers themselves) simply used to test that a certain function (or some other unit of work logic) is operating correctly.
- **Component tests** - these are tests that are focused on ensuring that individual components, independent from one another, behave in a correct manner; these are also useful for regression testing because changes to a component can easily trickle down and cause new, unexpected behaviors if not carefully applied.
- **Integration tests** - as the name suggests, these are tests that determine the correctness of how a system's parts interact (are integrated) together - even if all parts work together separately, there still has to be an assurance than when they all come together, individual parts will not end up breaking some aspect of some other part(s).
