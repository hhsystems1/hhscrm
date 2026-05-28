# Mission Control CRM — TODO

## Phase 3+: Frontend Chatwoot Panel
- [ ] Create `ChatwootConversationPanel` component (display on Company detail page)
  - Fetch conversations via `chatwootConversations` GraphQL query
  - List conversations with status badge, last message preview, unread count
  - Click to expand message thread via `chatwootConversationMessages`
  - Reply text box at bottom → `sendChatwootMessage` mutation
  - Status toggle → `toggleChatwootConversationStatus` mutation
- [ ] Register panel on Company show page layout
- [ ] Match Chatwoot contacts to Company records by email domain
- [ ] Create timeline activities when Chatwoot webhooks are received (in `chatwoot-process-webhook.job.ts`)

## Phase 4: Company Onboarding Wizard
- [ ] Design onboarding flow UI (multi-step form)
  - Step 1: Company info (name, domain, logo)
  - Step 2: Chatwoot config (API URL, token, account ID)
  - Step 3: Import contacts (pre-fill people from domain)
- [ ] Backend `duplicateWorkspace` mutation (clone template workspace schema)
- [ ] Admin creates workspace → assigns Chatwoot credentials → sends invite link

## Phase 5: HHS Admin Panel
- [ ] List all workspaces with status/activation info
- [ ] Create new workspace (trigger onboarding)
- [ ] Suspend/delete workspaces
- [ ] View workspace-level Chatwoot config
- [ ] View per-workspace usage metrics

## Phase 6: Polish & Production
- [ ] Encrypt `chatwootApiAccessToken` at rest (use existing `enc:v2:` pattern)
- [ ] Add Chatwoot HMAC signature verification in webhook controller
- [ ] Run DB migration to add chatwoot columns to `core.workspace` table
- [ ] E2E tests for Chatwoot integration
- [ ] Frontend tests for Chatwoot panel component
- [ ] Typecheck passes (requires building `twenty-shared` first)
