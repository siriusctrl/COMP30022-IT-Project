---
description: controller/MemberModel.js
---

# class MemberModelManage

## function static `getInstance()`

Method to get an instance of the manager.

### Returns

The instance of `MemberModelManage`



## function `getMember(callback, id)`

Method for getting a single member from the database

### Parameters

callback: callback function that will be called after fetching the MemberModel. Takes a [`Member`](class-member.md)\`\`

id: the id of the member



## An example for getting a member from database

```javascript
MemberModelManage.getInstance().getMember(
      (member) => {
            this.setState({memberModel: member, memberModelRdy: true});
            alert(member.generation)
    }, "member_1");
```

