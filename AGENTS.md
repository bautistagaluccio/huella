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
- Featured departures render from browser-safe structured calendar data sorted by departure month then starting day — why: multiple departures in one month remain chronological and testable.
- Ski departures use dedicated routes rendering a shared browser-safe SkiTripPage with departure-specific dates — why: replica trips retain identical content without duplicated presentation.
- Experimental ski navigation is opt-in per departure through SkiTripPage; focused tabs reuse SkiTripDetails section content — why: experiments do not alter other departures or duplicate trip facts.
- Bali detail tabs and experimental ski tabs reuse browser-safe detail components; the original ski departure uses six design-system anchor buttons beside its facts panel with matching sections below — why: each departure preserves its chosen navigation without duplicating trip facts.
- The ski agenda renders as day cards from the existing schedule data in src/lib/ski-schedule.ts — why: the agenda content stays the single source of truth when the layout changes.
- SkiTripDetails opts into photo-led presentation per departure while sharing the same content — why: visual experiments leave other departures unchanged.
