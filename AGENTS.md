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

- Keep the Vital Care landing as a single index route with anchored sections; the brief requests one integrated page.
- Keep contact validation and mail handoff in the shared contact module and contact UI in a separate component; this avoids storing health data or implying an unconfigured delivery service.
- Store uploaded page media through asset pointer imports and use a local square favicon; media stays CDN-managed while browsers receive a real icon.
