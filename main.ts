const token = Deno.env.get("VALTOWN");
const path = await Deno.realPath(Deno.args[0]);
const file = new TextDecoder().decode(await Deno.readFile(path));

async function main() {
  try {
    if (!token) {
      throw new Error("VALTOWN token not found");
    }

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const result = await fetch("https://api.val.town/v1/vals", {
      method: "POST",
      headers,
      body: JSON.stringify({
        code: file,
      }),
    });

    if (result.ok) {
      const { author, name } = await result.json();
      console.log(
        `Val created successfully! https://val.town/v/${author.username}/${name}`
      );
    } else {
      throw new Error(`Request failed with status ${result.status}`);
    }
  } catch (e) {
    console.error(e.message || e);
  }
}

main();
