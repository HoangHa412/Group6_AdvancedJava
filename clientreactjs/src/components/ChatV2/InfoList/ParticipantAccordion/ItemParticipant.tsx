import { observer } from "mobx-react";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ItemParticipant(props: any) {
    const navigate = useNavigate();
    const { participant } = props;
    const [imagePath, setImagePath] = useState('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');

    function renderAvatar() {
        if (participant && participant?.avatar && participant?.avatar != "") {
            setImagePath(participant?.avatar);
        }
    }

    useEffect(renderAvatar, []);

    return (
        <div className="px-4 py-2 m-1 flex-center justify-left list-item" onClick={() => navigate(`/profile/${participant?.id}`)}>
            <img className="participant-photo" src={imagePath} alt="" />
            <div className="flex-1 participant-info">
                <h1 className="participant-title">{participant?.lastName} {participant?.firstName}</h1>
            </div>
        </div>
    );
}

export default memo(observer(ItemParticipant));