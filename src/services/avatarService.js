const femaleNames = [
  "saba",
  "ayesha",
  "sana",
  "maham",
  "fatima",
  "maryam",
  "hira",
  "zainab",
  "laiba",
  "iqra",
  "alina",
  "amna",
  "eman",
  "iman",
  "dua",
  "hafsa",
  "areeba",
  "mehak",
  "kinza",
  "noor",
  "anaya",
  "maria",
  "hina",
  "aisha",
  "esha",
  "mahnoor",
  "minahil",
  "bisma",
  "sidra",
  "komal",
];

const maleNames = [
  "ali",
  "hamza",
  "bilal",
  "ahmed",
  "usman",
  "hassan",
  "hussain",
  "umar",
  "abdullah",
  "owais",
  "talha",
  "zain",
  "saad",
  "danish",
  "faizan",
  "arsalan",
  "adnan",
  "imran",
  "salman",
  "farhan",
  "asif",
  "shahzaib",
  "huzaifa",
  "rayyan",
  "ahsan",
  "waqas",
  "shehryar",
  "sameer",
  "rehan",
  "kamran",
];

export const getAvatarUrl = (username = "") => {
  const name = username.trim().toLowerCase();

  const firstName = name
    .split(/[\s._-]+/)[0]
    .replace(/[^a-z]/g, "");

  let gender = "neutral";

  if (femaleNames.includes(firstName)) {
    gender = "female";
  }

  if (maleNames.includes(firstName)) {
    gender = "male";
  }

  if (gender === "female") {
    return `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(
      username
    )}&backgroundColor=fce7f3`;
  }

  if (gender === "male") {
    return `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(
      username
    )}&backgroundColor=dbeafe`;
  }

  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    username
  )}&backgroundColor=e7efea&fontFamily=Arial`;
};