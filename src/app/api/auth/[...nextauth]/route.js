import fs from "fs";
import path from "path";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function getUsersFromFile() {
  const filePath = path.join(process.cwd(), "src", "data", "auth.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        const users = getUsersFromFile();

        const foundUser = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (foundUser) {
          return {
            id: foundUser.id, // 🔥 важливо
            name: foundUser.name,
            email: foundUser.email,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
