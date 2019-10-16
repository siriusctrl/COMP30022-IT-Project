---
description: controller/FamilyModel.js
---

# class FamilyAccount

## Properties

### Avatar

avatar of the family

### DateCreated

date of the create of the family

### Email

email address

### FamilyMember

### Name

family name

### Achievement

achievement got

## function `toObject()`

Method to get an normal object of familyAccount.

### Returns

The normal javascript instance of `FamilyAccount`

Contains only information of the family.



## function `getMembers(callback)`

Method for fetching all members of the family.

Callback will be called after all members are fetched.

### Parameters

callback: callback that takes a list of [`Member`](class-member.md)\`\`

