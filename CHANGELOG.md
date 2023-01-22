# Change Log

## 1.0.1 (2023/01/22 10:35:26)

- Fixed typos in documents

## 1.0.2 (2023/01/22 14:55:57)

- Fixed a problem in which the number of characters between even-numbered separator lines inserted would be zero

Only the front matter at the beginning of the file is now excluded from the count.

YAML front-matter that is placed outside the beginning of the file, such as [slidev](https://sli.dev/guide/syntax.html#front-matter-layouts), is not excluded from counting at this time.