import { useLayoutRenderingContext } from '@/ui/layout/contexts/LayoutRenderingContext';
import { SidePanelProvider } from '@/ui/layout/side-panel/contexts/SidePanelContext';
import { styled } from '@linaria/react';

import { type PageLayoutWidget } from '@/page-layout/types/PageLayoutWidget';

import { ChatwootConversationsPanel } from '@/page-layout/widgets/chatwoot/components/ChatwootConversationsPanel';

const StyledContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

type ChatwootWidgetProps = {
  widget: PageLayoutWidget;
};

export const ChatwootWidget = ({ widget: _widget }: ChatwootWidgetProps) => {
  const { isInSidePanel } = useLayoutRenderingContext();

  return (
    <SidePanelProvider value={{ isInSidePanel }}>
      <StyledContainer>
        <ChatwootConversationsPanel />
      </StyledContainer>
    </SidePanelProvider>
  );
};
