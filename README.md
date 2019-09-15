# COMP30022-IT-Project instructions
A collection of the subject COMP30022 from the university of Melbourne

## The Rule for making changes

1. create a new branch at newest (for most of time) point of master branch, the branch name should be a-b, where a = your name and b = the page or features your working on. For example, if i am working on homepage, the branch should be morry-HomeScreenUpdates.
2. Making your updates, which you can push as many time as you want on your **own branch**.
3. When you finish your updates, send a pull request to the master branch and assign (Sirius-ctrl) as reviewer unless there are some other updates in master branch. In that case, you should merge master branch first and resolve the collision before you make any pull-request.

## The rule for Code-Review

1. Most of the review will be done before I merge your branch into the master branch.
2. If there are some later modifications which I did not found when handling pull-request. I will open another branch and use the review anchors to instruct which part should be modified.

## Coding style

- Do not include unimplemented method in your pull-request code, unless
  1. You have a well structured comment, and the function will be implemented soon.
  2. It is for some special purpose.
- Do not use ambiguous variable name
- Comment is necessary for all the functions, except for JSX part.