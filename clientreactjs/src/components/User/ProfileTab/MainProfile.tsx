import { memo } from "react";
import { format, parseISO } from "date-fns";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { observer } from "mobx-react";
import { Grid } from "@mui/material";
import Icon from "../../shared/Icon";

function MainProfile(props: any) {
  const { isLoadingUser, userProfile } = props;
  return (
    <Grid container spacing={2} className="py-4">
      <Grid item xs={12}
      >
        <div className="infoCard">
          {isLoadingUser ? (
            <TableSkeleton
              styles="chats h-max-content w-full overflow-y-auto"
              length={5}
            />
          ) : (
            <div className="overflow-y-auto h-max-content ">
              <div className="flex flex-col mainProfileWrapper">
                <p className="mb-5 h3-bold">Giới thiệu</p>
                <div className="flex flex-col gap-4 text-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Code" />
                    <p>
                      Mã sinh viên:{" "}
                      <span>{userProfile?.MSV || "Chưa cập nhật"}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Cake" />
                    <p className="flex gap-2">
                      Ngày sinh:{" "}
                      <span>
                        {" "}
                        {userProfile?.birthDate ? (
                          <>
                            {format(
                              parseISO(
                                userProfile?.birthDate?.toString() || ""
                              ),
                              "yyy-MM-dd"
                            )}
                          </>
                        ) : (
                          <span>Chưa cập nhật</span>
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mails" />
                    <p>
                      Email:{" "}
                      <span>{userProfile?.email || "Chưa cập nhật"} </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" />
                    <p>
                      SDT:{" "}
                      <span>{userProfile?.phoneNumber || "Chưa cập nhật"}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="BookUser" />
                    <p>
                      Địa chỉ:{" "}
                      <span>{userProfile?.address || "Chưa cập nhật"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default memo(observer(MainProfile));
