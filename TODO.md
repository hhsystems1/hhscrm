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

## Phase 4A: Account Creation and Social Linking
- [ ] Decide account model for each person
  - Internal staff: invite as workspace members
  - Clients/customers: create Contact/Company records first, then add portal access only if needed
- [ ] Configure Google OAuth for sign-in and account linking
  - Set `AUTH_GOOGLE_ENABLED=true`
  - Set `AUTH_GOOGLE_CLIENT_ID`, `AUTH_GOOGLE_CLIENT_SECRET`
  - Set callback URLs for `/auth/google/redirect` and `/auth/google-apis/get-access-token`
- [ ] Configure Microsoft OAuth for sign-in and account linking
  - Set `AUTH_MICROSOFT_ENABLED=true`
  - Set `AUTH_MICROSOFT_CLIENT_ID`, `AUTH_MICROSOFT_CLIENT_SECRET`
  - Set callback URLs for `/auth/microsoft/redirect` and `/auth/microsoft-apis/get-access-token`
- [ ] Enable Gmail/Calendar sync flags when OAuth apps are ready
  - `MESSAGING_PROVIDER_GMAIL_ENABLED=true`
  - `CALENDAR_PROVIDER_GOOGLE_ENABLED=true`
  - `MESSAGING_PROVIDER_MICROSOFT_ENABLED=true`
  - `CALENDAR_PROVIDER_MICROSOFT_ENABLED=true`
- [ ] Add Contact and Company social profile fields
  - LinkedIn URL
  - Twitter/X URL
  - Facebook URL
  - Instagram URL
  - TikTok URL
- [ ] Build non-Google/Microsoft social OAuth connectors one provider at a time
  - Provider app setup and scopes
  - OAuth redirect endpoint
  - Encrypted token storage
  - Refresh and unlink flows
  - UI status for connected/disconnected accounts
- [ ] Define client portal requirements before creating external user logins
  - What records clients can see
  - What actions clients can take
  - Invite, password reset, and deactivation flow

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
