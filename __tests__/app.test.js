const endpointsJson = require("../endpoints.json")
/* Set up your test imports here */
const request = require("supertest")
const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data")
/* Set up your beforeEach & afterAll functions here */

afterAll(() => {
  return db.end()
})

beforeEach(() => {
  return seed(testData)
})

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson)
      })
  })
})

describe("GET /api/topics", () => {
  test("200: Responds with an array of objects th have property os slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics).toHaveLength(3)
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          })
        })
      })
  })
  test("200: the corrsponding response of object should be", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics).toHaveLength(3)
        topics.forEach((topic) => {
          expect(topics[0]).toMatchObject({
            slug: "mitch",
            description: "The man, the Mitch, the legend",
          })
        })
      })
  })
  test("404: Responds with Sorry Not Found when requesting was from a bad URL", () => {
    return request(app)
      .get("/api/to")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("Sorry Not Found")
      })
  })
})

describe("GET /api/articles/:article_id", () => {
  test("200: Respond with a object for the article id passed", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toMatchObject({
          article_id: 1,
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          body: "I find this existence challenging",
          topic: "mitch",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        })
      })
  })
  test("404: Article_id does not exist", () => {
    return request(app)
      .get("/api/articles/100")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("article does not exist")
      })
  })
  test("400: Article_id is not a number", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request")
      })
  })
})
describe("GET /api/articles", () => {
  test("200: Responds with an array of article objects with the correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(13)
        articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            author: expect.any(String),
            title: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          })
        })
      })
  })
  test("200: Responds with an array of article objects in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSortedBy("created_at", { descending: true })
      })
  })
  test("200: Returned a objects without a body", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(13)
        articles.forEach((article) => {
          expect(article).not.toHaveProperty("body")
        })
      })
  })
})
describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with all comments and properties article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments.length).toBe(11)
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
          })
        })
      })
  })
  test("200: Responds with comments ordered by most recent", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments).toBeSortedBy("created_at", { descending: true })
      })
  })
  test("404: Returns with error if article_id does not exist", () => {
    return request(app)
      .get("/api/articles/1234/comments")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("article does not exist")
      })
  })
  test("400: Returns with error if article_id is not a number", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request")
      })
  })
})
test("404: Returns with error if endpoint is valid but no comment", () => {
  return request(app)
    .get("/api/articles/2/comments")
    .expect(404)
    .then(({ body: { message } }) => {
      expect(message).toBe("article does not exist")
    })
})
describe("POST /api/articles/:article_id/comments", () => {
  test("201: Post comment on a article", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
        body: "test",
      })
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toEqual({
          article_id: 1,
          votes: 0,
          created_at: expect.any(String),
          comment_id: expect.any(Number),
          author: "butter_bridge",
          body: "test",
        })
      })
  })
  test("400: Article_id is not a number", () => {
    return request(app)
      .post("/api/articles/banana/comments")
      .send({
        username: "butter_bridge",
        body: "test",
      })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request")
      })
  })
  test("400: Invalid user", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "invalid",
        body: "test",
      })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("User does not exist")
      })
  })
  test("400: Article_id does not exist", () => {
    return request(app)
      .post("/api/articles/99999/comments")
      .send({
        username: "butter_bridge",
        body: "test",
      })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("User does not exist")
      })
  })
  test("404: Missing body", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
      })
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("missing information")
      })
  })
  test("404:Multiple errors", () => {
    return request(app)
      .post("/api/articles/1234/comments")
      .send({ username: "butter_bridge" })
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("missing information")
      })
  })
})
describe("PATCH /api/articles/:article_id", () => {
  test("201: Returns with updated article vote count", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 5 })
      .expect(201)
      .then(({ body: { article } }) => {
        expect(article).toMatchObject({
          article_id: 1,
          author: expect.any(String),
          title: expect.any(String),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: 5,
          article_img_url: expect.any(String),
        })
      })
  })
  test("400: Responds with an error if sent a empty object", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({})
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request")
      })
  })
  test("400: Responds with an error if request key is not inc_votes", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ votes: 1 })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request")
      })
  })
  test("400: Responds with an error message if inc_vote is not a number", () => {
    return request(app)
      .patch("/api/articles/5")
      .send({ inc_votes: "banana" })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request")
      })
  })
  test("400: Article_id does not exist", () => {
    return request(app)
      .patch("/api/articles/banana")
      .send({ inc_votes: 10 })
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request")
      })
  })
  test("400: Article_id does not exist", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send({ inc_votes: 10 })
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("Sorry Not Found")
      })
  })
})

describe("DELETE /api/comments/:comment_id", () => {
  test("204: Deletes comment and then responds empty", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({})
      })
  })
  test("404: Comment_id does not exist", () => {
    return request(app)
      .delete("/api/comments/1234")
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("comment does not exist")
      })
  })
  test("400: Comment_id is not a number", () => {
    return request(app)
      .delete("/api/comments/banana")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request")
      })
  })
})
describe("GET /api/users", () => {
  test("200: Responds with users with the correct properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users.length).toBe(4)
        users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          })
        })
      })
  })
})
describe("GET /api/articles?sort_by&order_by", () => {
  test("200: sort by title in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(13)
        expect(articles).toBeSortedBy("title", { descending: true })
      })
  })
  test("200: sorted by title in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=topic")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(13)
        expect(articles).toBeSortedBy("topic", { descending: true })
      })
  })
  test("200: sorted by title in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=author&order_by=ASC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(13)
        expect(articles).toBeSortedBy("author", { descending: false })
      })
  })
  test("200: sorted by title in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order_by=ASC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(13)
        expect(articles).toBeSortedBy("votes", { descending: false })
      })
  })
  test("200: sorted in ascending order with sort_by created_at", () => {
    return request(app)
      .get("/api/articles?order_by=ASC")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(13)
        expect(articles).toBeSortedBy("created_at", { descending: false })
      })
  })
  test("400: error message if invalid sort_by query", () => {
    return request(app)
      .get("/api/articles?sort_by=banana")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request")
      })
  })
  test("400: error message if invalid order_by", () => {
    return request(app)
      .get("/api/articles?order_by=banana")
      .expect(400)
      .then(({ body: { message } }) => {
        expect(message).toBe("Bad request")
      })
  })
})
describe('GET /api/articles?topic', () => {
  test("200: articles filtered by topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toBe(12);
        articles.forEach((article) => {
          expect(article).toMatchObject({
            topic: "mitch",
            article_id: expect.any(Number),
            title: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          });
        });
      });
  });
  test('200: if no articles then returns a empty array', () => {
    return request(app)
      .get('/api/articles?topic=paper')
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toEqual([]);
      });
  });
  test("404: If topic doesn't exist returns error", () => {
    return request(app)
      .get('/api/articles?topic=banana')
      .expect(404)
      .then(({ body: { message } }) => {
        expect(message).toBe("Sorry Not Found");
      });
  });
});
