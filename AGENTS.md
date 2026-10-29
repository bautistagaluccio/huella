<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Admin area is a single client-only route (/admin-huella) using the browser client; access is enforced by RLS via has_role(admin) on user_roles — why: no server functions needed, DB is the security boundary.
- Sport availability pages use one dynamic /sports/$sport route, while individual scheduled experiences keep dedicated detail routes — why: sport listings stay consistent without duplicating page structure.
- Featured departures render from browser-safe structured calendar data sorted by departure month — why: chronology is explicit and testable without coupling tests to presentation.
- Trip detail pages (Bali retreat, ski trip) use a dedicated browser-safe component with accessible design-system tabs beside the event facts card — why: visitors can compare categories without a long stack of descriptions or losing the trip details.
- The ski agenda renders as day cards from the existing schedule data in src/lib/ski-schedule.ts — why: the agenda content stays the single source of truth when the layout changes.
