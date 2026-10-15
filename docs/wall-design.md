# The Wall (asha.com.ng/wall): design notes

A campaign pair: **Wall of Shame** ("what has a client done to you?") and **Wall of Fame** ("what has Asha done for you?"). Creatives send a short story, anonymous or with their @handle. A person at Asha reads every one before it goes up.

The code is in `src/wall/`. This file records the design decisions so they survive after the design canvas is gone.

## Pages
| Address | What it is |
|---|---|
| `/wall` | Send page. Tabs: Wall of Shame / Wall of Fame. Story box (300 characters), up to 3 screenshots, optional title above the screenshots, Anonymous or "Use my @handle". |
| `/wall/shame`, `/wall/fame` | The walls. Approved stories only, newest first. |
| `/stats` | Live numbers. See `stats-design.md`. |
| app `/wall/review` | Moderators only (in the bluframer app repo). |
| app `/wall/handle` | Sign-in step for "Use my @handle" (in the bluframer app repo). |

## Look
- Same two-tone palette as the landing page: light `#f7f7f3`, dark navy `#1c283e`, mid grey `#949aa2` for the tape. Not the bright blue.
- Fonts: Indie Flower for display and buttons, Instrument Sans for text.
- Cards are the hero's taped prints: slight tilt (about -1 to -2 degrees), a hard offset shadow, a strip of tape on top. The question sits on a navy header, the story on white.
- Pills and nav match the landing page. The Asha logo (dark on light backgrounds, light on dark) replaces the old "A" icon everywhere.
- No emoji. Real buttons and inputs, 44px minimum touch targets.

## Story card (what gets shared)
1080 x 1920, drawn in the browser (`storyCard.js`). **Layout B** was chosen:
1. Asha logo at the top, then "Wall of Shame" or "Wall of Fame" under it.
2. The story card (question on navy, story on white, "Anonymous creative" or @handle). **It has a fixed position and is read first.**
3. The first screenshot in a taped print under it, with its title above the picture.
4. "+N more on the wall" if there are more screenshots.
5. `asha.com.ng/wall` at the bottom.

Rule: the text card never moves down to make room. Screenshots only use the space left below it, so one screenshot is shown large enough to read without squinting, and the rest stay on the wall. (This is why the story card shows one screenshot.) With no screenshot, the story is set larger in Indie Flower and centred.

An alternative, **Layout A** (title at the top, logo at the bottom), was designed and not chosen.

## Limits
Story 300 characters, screenshot title 60, up to 3 screenshots, 5 MB each (images only), 5 stories per hour per connection. Screenshots are crop-and-blur-it-yourself first: the form says to crop to the lines that matter and blur names, numbers and faces.

## Identity
- **Anonymous** is the default.
- **Use my @handle** needs an Asha account. If they aren't signed in, the page says why (their @handle goes on the story and opens their Asha portfolio, so readers can find their work) and offers "Sign in or sign up" or "Stay anonymous".
- The handle is never typed in. It comes from a short-lived signed ticket the API issues to the signed-in account, and the handle shown is read from the account when the card is displayed. Only creatives who finished profile setup can use one.
- Clicking a handle on the wall opens `app.asha.com.ng/<username>`.

## Review (privacy)
Nothing is public until a moderator publishes it. The review page flags phone numbers and emails or @names in the text, and lets the moderator draw boxes over names, numbers and faces; the blurred copy replaces the file and the original is deleted. No client names on the wall.

## Share sheet (after sending)
Shows the story card, then: WhatsApp and Facebook (share links), Instagram Story and Snapchat (on a phone: the phone's share sheet with the card attached, because neither has a web link that attaches an image; on desktop the card is saved to post by hand), Copy link, Save card as image.

## Not designed or built yet
Edit/withdraw a story after sending, "Same here" reactions (shown in the early design only), per-story pages.
