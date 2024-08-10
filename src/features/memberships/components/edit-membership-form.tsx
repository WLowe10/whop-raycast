import { Action, ActionPanel, Form, Icon, showToast, Toast } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { useMembership } from "../hooks/use-membership";
import { updateMembership } from "../api";

export type EditMembershipFormProps = {
	membershipId: string;
	onMutate: () => void;
};

export const EditMembershipForm = ({ membershipId, onMutate }: EditMembershipFormProps) => {
	const getMembership = useMembership(membershipId);
	const membership = getMembership.data;

	const form = useForm({
		initialValues: {
			metadata: membership?.metadata ? JSON.stringify(membership.metadata) : "{}",
		},
		validation: {
			metadata: (val) => {
				if (!val) {
					return "Metadata is required to at least be '{}'";
				}

				try {
					JSON.parse(val);
				} catch {
					return "Metadata must be valid JSON";
				}
			},
		},
		onSubmit: async (values) => {
			const toast = await showToast({
				style: Toast.Style.Animated,
				title: "Updating membership",
			});

			try {
				await updateMembership(membershipId, {
					metadata: JSON.parse(values.metadata),
				});

				toast.style = Toast.Style.Success;
				toast.title = "Updated Membership";

				getMembership.mutate();
				onMutate();
			} catch (err) {
				toast.style = Toast.Style.Failure;
				toast.title = "Failed to Update Membership";
			}
		},
	});

	return (
		<Form
			navigationTitle="Edit Membership"
			isLoading={getMembership.isLoading}
			actions={
				<ActionPanel>
					<Action.SubmitForm
						title="Edit Membership"
						icon={Icon.Pencil}
						onSubmit={form.handleSubmit}
					/>
				</ActionPanel>
			}
		>
			<Form.TextArea
				title="Metadata"
				info="The JSON metadata for the membership"
				{...form.itemProps.metadata}
			/>
		</Form>
	);
};
