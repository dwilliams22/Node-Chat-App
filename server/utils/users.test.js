const expect = require("expect");

const {Users} = require("./users");

describe("Users", () => {

   let users;

   beforeEach(() => {
      users = new Users();
      users.users = [{
         id: 1,
         name: "Mike",
         room: "Angular Course"
      }, {
         id: 2,
         name: "Jen",
         room: "React Course"
      }, {
         id: 3,
         name: "Tom",
         room: "Angular Course"
      }]
   });

   it("should add new user", () => {
      let users = new Users();
      let user = {
         id: 123,
         name: "Deonte",
         room: "Node Course"
      };
      let resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
   });

   it("should remove a user", () => {
      let userId = 1;
      let user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
   });

   it("should not remove a user", () => {
      let userId = 10;
      let user = users.removeUser(userId);

      expect(user).toNotExist();
      expect(users.users.length).toBe(3);
   });

   it("should find a user", () => {
      let userId = 2;
      let user = users.getUser(userId);

      expect(user.id).toBe(userId);
   });

   it("should not find a user", () => {
      let userId = 5;
      let user = users.getUser(userId);

      expect(user).toNotExist();
   });

   it("should return names for angular course", () => {
      let userList = users.getUserList("Angular Course");

      expect(userList).toEqual(["Mike", "Tom"]);
   });

   it("should return names for react course", () => {
      let userList = users.getUserList("React Course");

      expect(userList).toEqual(["Jen"]);
   });
});