import FormField from "@/shared/FormField";
import EpicIdIcon from "../../../assets/icons/epic-id.svg?react";
import type { IEpics } from "../types/epics.types";
import { useForm } from "react-hook-form";
import Button from "@/shared/Button";
import CloseIcon from "@/assets/icons/close.svg?react";
import Label from "@/shared/Label";
import EpicAvatar from "./EpicAvatar";
import UnassignIcon from "@/assets/icons/unassign.svg?react";
import { formateDateString, getNameInitials } from "@/shared/utils/utils";
import { fetchMembers } from "@/shared/store/slices/members.slice";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/store/store";
import CalenderIcon from "@/assets/icons/calendar.svg?react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/shared/store/store";
import { components, type OptionProps } from "react-select";
import type { SelectOption } from "@/shared/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import { epicsSchema, type TEpicsInput } from "../schemas/epics.schema";

import { toast } from "react-toastify";
import { updateEpicThunk, fetchEpicById } from "@/shared/store/slices/epics.slice";

const MembersOption = (props: OptionProps<SelectOption, false>) => {
    return (
        <components.Option {...props}>
            <div className="flex items-center gap-2">
                {props.data.icon}
                <span>{props.data.label}</span>
            </div>
        </components.Option>
    );
};

interface IProps {
    epic: IEpics;
    onClose?: () => void;
}

function EpicDetails({ epic, onClose }: IProps) {
    const {
        control,
        getValues,
        trigger,
        getFieldState,
        formState: { errors },
    } = useForm<TEpicsInput>({
        resolver: zodResolver(epicsSchema),
        mode: 'onBlur',
        values: {
            title: epic?.title || '',
            description: epic?.description || '',
            assignee_id: epic?.assignee?.sub || '',
            deadline: epic?.deadline || '',
        },
    });

    const { projectId } = useParams();
    const dispatch = useAppDispatch();
    const members = useAppSelector((state) => state.members.members);

    useEffect(() => {
        if (members.length === 0 && projectId) {
            dispatch(fetchMembers(projectId));
        }
    }, [projectId, dispatch, members.length]);

    
    const onHandleSubmitEpic = async (data: Record<string, any>) => {
        try {
            await dispatch(updateEpicThunk({ epicId: epic.id, data })).unwrap();
            if (projectId) {
                dispatch(fetchEpicById({ projectId, epicId: epic.id }));
            }
            toast.success("Epic updated successfully");
        } catch (error: any) {
            toast.error(error?.message || "Failed to update epic");
        }
    };

    const handleUpdateEpic = async (fieldName: keyof TEpicsInput) => {
        const isFieldValid = await trigger(fieldName);
        const { isDirty: isFieldDirty } = getFieldState(fieldName);

        if (isFieldValid && isFieldDirty) {
            if (fieldName === 'assignee_id' && getValues(fieldName) === '') {
                onHandleSubmitEpic({
                    [fieldName]: null,
                });
            } else {
                onHandleSubmitEpic({
                    [fieldName]: getValues(fieldName),
                });
            }
        }
    };



    const metaLabelStyle = `text-label-sm text-secondary lg:text-slate-dark/40 lg:text-body-xs lg:leading-3.75 uppercase`;
    const metaContentStyle = `font-medium leading-5 text-body text-slate-dark`;
    const membersDefaultValue = {
        value: '',
        label: 'Unassigned',
        icon: (
            <EpicAvatar
                className="bg-surface-dark text-slate-dark/80!"
                content={<UnassignIcon className="w-3 text-secondary" />}
            />
        ),
    };
    const userInitial = getNameInitials(epic?.created_by?.name!);
    const formattedDeadline = formateDateString(epic?.deadline!, 'en-US');
    const formattedCreatedDate = formateDateString(epic?.created_at, 'en-US');

    const membersOptions = [
        membersDefaultValue,
        ...(members?.map((member) => ({
            value: member?.user_id,
            label: member?.metadata?.name,
            icon: (
                <EpicAvatar
                    className="bg-surface-dark text-slate-dark/80!"
                    content={getNameInitials(member.metadata?.name)}
                />
            ),
        })) || []),
    ];

    return (
        <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-3 light-gradient pt-6 lg:pt-8 px-6 lg:px-8 lg:border-b lg:border-b-slate-light/15 pb-4">
                {/* epic id row */}
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2 items-center cursor-default">
                        <EpicIdIcon className="w-5 text-primary hidden lg:block" />
                        <span className="font-bold text-body-xs text-primary lg:text-body-sm leading-4 letter-spacing-md lg:text-slate-dark/40 uppercase">
                            {epic?.epic_id}
                        </span>
                    </div>
                    {/* actions */}
                    <Button
                        variant="ghost"
                        className="w-fit! p-0.5! flex items-center justify-center cursor-pointer"
                        onClick={onClose}
                    >
                        <CloseIcon className="size-3.5 text-slate-dark/40" />
                    </Button>
                </div>
                {/* epic title */}
                <div className="bg-white border border-surface-highest rounded-xl p-3 w-full">
                    <FormField
                        inputClassName="font-bold text-heading-5 leading-6 lg:text-heading-4 text-slate-dark lg:leading-8 capitalize"
                        control={control}
                        name="title"
                        label={epic?.title}
                        placeholder="Enter title"
                        className="bg-transparent!"
                        isEditing
                        onBlur={() => handleUpdateEpic('title')}
                    />
                </div>
            </div>
            {/* epic info */}
            <div className="flex flex-col gap-5 lg:gap-8 px-6 lg:px-8 pb-6 lg:pb-8">
                {/* details */}
                <div className="flex flex-col gap-2 mb-2">
                    <Label
                        htmlFor="description"
                        className="lg:hidden text-label-sm text-secondary uppercase"
                    >
                        description
                    </Label>
                    <div className="bg-white border border-surface-highest rounded-xl p-3">
                        <FormField
                            control={control}
                            name="description"
                            label={epic?.description}
                            placeholder={`No description provided`}
                            inputClassName="text-secondary text-body leading-5 lg:text-slate-dark/80 lg:text-body-lg lg:leading-6.5 resize-none min-h-10"
                            isTextArea
                            isEditing
                            className="bg-transparent!"
                            onBlur={() => handleUpdateEpic('description')}
                        />
                    </div>
                </div>

                {/* meta */}
                <div className="grid grid-cols-2 lg:grid-cols-3 items-start gap-6">
                    {/*1. created by */}
                    <div className={`flex flex-col gap-2 cursor-default`}>
                        <span
                            className={`text-label-sm text-secondary lg:text-slate-dark/40 lg:text-body-xs lg:leading-3.75 uppercase`}
                        >
                            created by
                        </span>
                        <div className="flex items-center gap-2">
                            <span>
                                <EpicAvatar content={userInitial} />
                            </span>
                            <span className={metaContentStyle}>{epic?.created_by?.name}</span>
                        </div>
                    </div>

                    {/*2. assignee */}
                    <div className="flex flex-col gap-2 mb-2 w-full">
                        <Label
                            htmlFor="assignee_id"
                            className={metaLabelStyle}
                        >
                            assignee
                        </Label>
                        <div className="flex items-center gap-2 w-full">
                            <FormField
                                control={control}
                                name="assignee_id"
                                label={epic?.assignee?.name || 'Unassigned'}
                                placeholder={`Assign an epic`}
                                className={`bg-transparent! ${metaContentStyle} select-field`}
                                isSelect
                                isEditing
                                options={membersOptions}
                                customOptionComponents={{ Option: MembersOption }}
                                onChange={() => handleUpdateEpic('assignee_id')}
                            />
                        </div>
                    </div>

                    <div className="lg:hidden border-t border-t-slate-dark/30 col-span-2"></div>

                    {/*3. deadline */}
                    {epic?.deadline && (
                        <div className="flex flex-col gap-2 relative">
                            <Label
                                htmlFor="deadline"
                                className={metaLabelStyle}
                            >
                                deadline
                            </Label>
                            <FormField
                                control={control}
                                type="date"
                                name="deadline"
                                label={formattedDeadline}
                                inputClassName={`${metaContentStyle} order-2 w-full`}
                                className="gap-2! bg-transparent! items-center date relative"
                                placeholder="YYYY-MM-DD"
                                isEditing={true}
                                icon={
                                    <CalenderIcon className="text-primary lg:text-slate-dark/40 w-3.25" />
                                }
                                iconClassName="px-0! py-0!"
                                onChange={() => handleUpdateEpic('deadline')}
                            />
                        </div>
                    )}

                    {/*4. created at */}
                    <div className={`flex flex-col gap-2 cursor-default`}>
                        <span
                            className={`text-label-sm text-secondary lg:text-slate-dark/40 lg:text-body-xs lg:leading-3.75 uppercase`}
                        >
                            created at
                        </span>
                        <div className="flex items-center gap-2">
                            <span>
                                <CalenderIcon className="text-primary lg:text-slate-dark/40 w-3.25" />
                            </span>
                            <span className="font-medium leading-5 text-body text-slate-dark">
                                {formattedCreatedDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EpicDetails;