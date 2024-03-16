const token = Deno.env.get("VALTOWN");
const path = await Deno.realPath(Deno.args[0]);
const file = new TextDecoder().decode(await Deno.readFile(path));

async function main() {
  try {
    if (!token) {
      throw new Error("VALTOWN token not found");
    }
  } catch (e) {
    console.error(e);
    return;
  }

  try {
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

    const { author, name } = await result.json();

    console.log(
      `Val created successfully! https://val.town/v/${author.username}/${name}`
    );
  } catch (e) {
    console.error(e);
  }
}

main();
