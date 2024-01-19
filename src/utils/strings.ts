export const capitalFirst = (str: String) => {
    const sections = str.split("/");
    for (let i = 0; i < sections.length; i++) {
        const words = sections[i].split(" ");
        for (let j = 0; j < words.length; j++) {
            if (words[j].toUpperCase() === "NA") {
                words[j] = "NA";
            } else {
                words[j] = words[j].charAt(0).toUpperCase() + words[j].slice(1);
            }
        }
        sections[i] = words.join(" ");
    }
    return sections.join("/");
}