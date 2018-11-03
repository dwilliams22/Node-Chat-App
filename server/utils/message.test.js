const expect = require("expect");
const {generateMessage} = require("./message");

describe("generateMessage", () => {
   it("should generate correct message object", () => {
      let from = "Deonte";
      let text = "hello";
      let message = generateMessage(from, text);

      expect(message).toInclude({from});
      expect(message.createdAt).toBeA("number");
   });
});