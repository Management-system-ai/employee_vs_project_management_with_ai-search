async function generateHash(str: string) {
    const data = str;
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
}

export default generateHash;