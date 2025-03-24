import { memo, useEffect } from 'react'
import { useStore } from '@/stores';
import { observer } from 'mobx-react';
import ConversationList from './ConversationList/ConversationList';
import MessageList from './MessageList/MessageList';
import InfoList from './InfoList/InfoListIndex';
import './ChatV2Index.scss';
import '@/common/CommonStyles.scss';
import { Grid } from '@mui/material';

function ChatIndex() {
    const { chatStore } = useStore();
    const {
        resetStore,
        getAllJoinedRooms,
        setIsLoading
    } = chatStore;

    useEffect(function () {

        setIsLoading(true);
        // registerUser();
        getAllJoinedRooms()
            .finally(function () {
                setIsLoading(false);
            })

        return resetStore;
    }, []);

    return (
        <div
            className="flex-1 p-0 m-0 app flex-center w-100"
        >
            <div className="messenger">
                <Grid container spacing={0}>
                    <Grid
                        item
                        xs={0} sm={4} md={4} lg={3}
                        display={{ xs: "none", sm: "block" }}
                    >
                        <div className="scrollable sidebar">
                            <ConversationList />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={8} md={5} lg={6}>
                        <div className="p-0 scrollable content">
                            <MessageList />
                        </div>
                    </Grid>

                    <Grid item xs={0} sm={0} md={3} lg={3}
                        display={{ xs: "none", sm: "none", md: "block" }}
                    >
                        <div className="sidebar d-lg-block">
                            <InfoList />
                        </div>
                    </Grid>
                </Grid>


            </div>
        </div>
    )
}

export default memo(observer(ChatIndex));