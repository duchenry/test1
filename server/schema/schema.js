const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");
const _ = require("lodash");
const { resolve } = require("path");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

let books = [
  { name: "Fat and Thin", genre: "Fantasy", id: "1", authorID: "1" },
  { name: "How to influence people", genre: "Fantasy", id: "2", authorID: "2" },
  { name: "Big Think", genre: "Sci-fi", id: "3", authorID: "3" },
  { name: "Go Along", genre: "Fantasy", id: "4", authorID: "2" },
  { name: "Grow Rich", genre: "Fantasy", id: "5", authorID: "2" },
  { name: "Star War", genre: "Sci-fi", id: "6", authorID: "3" },
];

let authors = [
  {
    name: "Henry Ford",
    age: 23,
    id: "1",
  },
  {
    name: "Theresa",
    age: 41,
    id: "2",
  },
  {
    name: "Bobby",
    age: 61,
    id: "3",
  },
];

/* Pick BookType is parent */
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    authorID: {
      type: GraphQLID,
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        //return _.find(authors, {id: parent.authorID,}); /* id is a param of Author, authorID is a param of Book */
        return Author.findById(parent.authorID);
      },
    },
  }),
});

/* Pick AuthorType is parent */
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        console.log(parent);
        //return _.filter(books, {authorID: parent.id,}); /* id is a param of Author, authorID is a param of Book */
        return Book.find({ authorID: parent.id });
      },
    },
  }),
});

/* RootQuery is a method to show book and author */
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //console.log(typeof args.id);
        //return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //return authors;
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorID: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorID: args.authorID,
        });
        return book.save();
      },
    },
  },
});

/*(attention) fields: when having {}, params in that having to be definded(authors and books are above) */
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
