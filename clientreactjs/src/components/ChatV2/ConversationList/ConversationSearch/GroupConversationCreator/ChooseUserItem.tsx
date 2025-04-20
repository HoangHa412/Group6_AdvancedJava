import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import { ListItem, ListItemAvatar, ListItemButton, ListItemText, Checkbox, Avatar } from '@mui/material';

function ChooseUserItem(props: any) {
    const { labelId, user, joinUserIds, setJoinUserIds } = props;

    const [imagePath, setImagePath] = useState(user?.avatar);


    function handleChangeJoinUserIds() {
        const currentUserId = user.id;
        if (joinUserIds.includes(currentUserId)) {
            let newJoinUserIds = joinUserIds.filter((userId: string) => userId !== currentUserId);
            newJoinUserIds = [...newJoinUserIds];
            setJoinUserIds(newJoinUserIds);
            return;
        }

        joinUserIds.push(currentUserId);
        const newJoinUserIds = [...joinUserIds];
        setJoinUserIds(newJoinUserIds);
    }

    return (
        <ListItem
            className="p-0 br-10"
            secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={handleChangeJoinUserIds}
                    checked={joinUserIds.includes(user.id)}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
            }
            disablePadding
        >
            <ListItemButton
                className="p-2 py-2"
            >
                <ListItemAvatar>
                    <Avatar
                        alt=''
                        src={imagePath}
                    />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${user.lastName} ${user.firstName}`} color='black' />
            </ListItemButton>
        </ListItem>
    );
}

export default memo(observer(ChooseUserItem));