---
description: controller/MemberModel.js
---

# class Member

## Properties

### memberObj.`dob`

birthday

### memberObj`.firstName`

### memberObj`.gender`

### memberObj`.generation`

### memberObj`.item`

All items of the member

### memberObj`.lastName`

### memberObj`.profileImage`

profile avatar

### memberObj`.ringColor`

color that represents a custom kind of person

### memberObj`.id`



## function `updateFirstName(newFirstName)`

Method to update the first name

### Parameters

newFirstName: new first name of the member



## function `toObject()`

### Returns

The normal javascript instance of `Member`

Contains only information of the member.



## function `getItems(callback)`

Method for fetching all items of the member

Callback will be called after all items are fetched.

### Parameters

callback: callback that takes a list of Item

