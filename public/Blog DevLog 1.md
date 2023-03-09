### Building a personal blog with Next.js, Prisma and PostgreSQL

### Why I started this project

To start off this log, I want to establish the reasons for building this little platform in the first place

- Main one for sure is to keep practicing **SQL and relational databases**
- Having better written code to display to employers. Most of my bigger personal projects were made years ago, and without any regard to good coding practices
- Have a place to display what I'm working on

This was the initial idea around it. A simple project just to stay sharp and have something a little more well done to display.
The more I thought about it, the more it made sense. With this place I can hopefully show what I'm working on, as well as going beyond code to display some skills.
The most apparent example probably is the fact I'm doing this all in english. Currently, I dont have any certification to prove my proficiency in the language, so maybe this helps.

Throughout all of the logs I make here, I'll just be refencing the source code available at [GitHub](https://github.com/gustavosilveiragss/blog/)

### The Stack

Enough of introducing. I should get on with **how** I'm planning to build it.

As I've already mentioned, I'll be using a **PostgreSQL database**. For this project it made the most sense to use **[Supabase](https://supabase.com)**, as it was extremely easy to setup and would let me focus on the database itself, and not the hosting service.

To make queries and models, I'll be using the **Prisma ORM**, as it should speed things up without many drawbacks.

For the frontend, as always, I'll go with **React**. Lastly, **Next.js** should be enough to handle any API I'll need.

### First step was building the models

Using Prisma, I made the first few models I think I'll need. Obviously more stuff will be popping up as we go, but these should be the main ones

Here are the initial models:

~~~typescript
model Post {
  id         String    @id @unique @default(cuid())
  title      String
  content    String?
  published  Boolean   @default(false)
  author     User?     @relation(fields: [authorId], references: [id])
  authorId   String?
  Category   Category? @relation(fields: [categoryId], references: [id])
  categoryId String?
}

model User {
  id    String @id @unique @default(cuid())
  email String @unique
  name  String
  posts Post[]
}

model Category {
  id    String @id @unique @default(cuid())
  name  String
  posts Post[]
}

enum Role {
  USER
  ADMIN
}
~~~

These are in no way definitive. The one I'm most on the fence about is the whole `User/Role` scheme.

I'm not sure if this platform will have authentication. I want to implement it, but I dont exactly see a purpose in doing so. The feature would only be used for commenting. But, at least as of right now, I don't think that makes that much sense.

### Feed Page

I only plan on making two pages. First one for the main feed, with all the Posts. As well as the Post page, with a dynamic url.

So, first I made `src/pages/index.tsx`, and tested how to use Prisma to get data from the database, in `getStaticProps`.

Once I found out how to do it, I moved on to scheming out the Post page. Same, kind of structure, with a dynamic url for each post id (`src/pages/posts/[id].tsx`).

Having the data fetched in both pages, I could move on to the **UI**.

First, I prototyped a simple UI for the **Feed**. Using **Tailwind**, it was quite quick to get the initial idea out. I want it to be pretty simple, with:

- A centralized list of cards for each Post
  - Each containing the title, subtitle and category
- Filters by category
- Search by title input field

I'm also constantly testing it in different browsers and screen sizes to be sure it's decently responsive

### Post Page

Now to the Post Page, which should have:

- All the Post's content (title, subtitle, category and body)
- Filter by category upon clicking the category badge
- A NavBar that lets you search by title or go back to the main feed

The main challenge for this one is I want to write all Posts contents with **Markdown**, then convert it to html/css. To achieve this, I used the [React Markdown](https://github.com/remarkjs/react-markdown) plugin, with custom css and some other styling (e.g. [Code Blocks](https://www.npmjs.com/package/react-code-blocks)). Here's my implementation for that (all custom css in `src/styles/globals.css`):

~~~typescript
<ReactMarkdown
    children={post.content}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
                <CodeBlock
                    text={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    showLineNumbers={true}
                    theme={dracula}
                />
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            )
        }
    }}
/>
~~~

### Final Remarks

These were the initial steps to this project. I should be registering the process as I go, but I can't assure all of them will be as long as this was.

Once again, if anyone actually wants to see the whole source code, you can find it on [GitHub](https://github.com/gustavosilveiragss/blog/).