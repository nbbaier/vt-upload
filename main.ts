const token = Deno.env.get("VALTOWN");
const path = await Deno.realPath(Deno.args[0]);
const file = new TextDecoder().decode(await Deno.readFile(path));

const result = await fetch("https://api.val.town/v1/vals", {
  method: "POST",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    // TODO name: filename,
    code: file,
  }),
});

console.log(result.status);
