const expect = require("expect");
const {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
   it("should generate correct message object", () => {
      let from = "Deonte";
      let text = "hello";
      let message = generateMessage(from, text);

      expect(message).toInclude({from, text});
      expect(message.createdAt).toBeA("number");
   });
});

describe("generateLocationMessage", () => {
   it("should generate correct location object", () => {
      let from = "Deonte";
      let latitude = 15;
      let longitude = 19;
      let url = "https://www.google.com/maps?q=15,19";
      let message = generateLocationMessage(from, latitude, longitude);

      expect(message).toInclude({from, url});
      expect(message.createdAt).toBeA("number");
   });
});