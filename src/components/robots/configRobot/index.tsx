import DropDownPoper from "@/components/core/DropDownPoper";
import { Input } from "@/components/ui/input";
import { FieldRowsSettings, IAddMissionFormProps } from "@/lib/interfaces/missions";
import { getAllRobotsAPI } from "@/lib/services/robots";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { FC, useState } from "react";

const ConfigRobotForm: FC<IAddMissionFormProps> = (props) => {
    const { viewFieldData } = props
    const navigate = useNavigate();
    const [robotsDropdown, setRobotsDropdown] = useState<string[] | undefined>()
    const robotType = ["DEMETER_MINI", "DEMETER_MAXI"]
    const [fieldRowsSettings, setFieldRowsSettings] = useState<FieldRowsSettings>({
        RowSpacing: 0,
        HeadLandWidth: 0,
        RowPattern: "",
        StepSize: 0,
    })
    const {
        data: allRobotsData,
        refetch,
        isLoading: isLoadingRobots
    } = useQuery({
        queryKey: [
            "all-robotsData",
        ],
        queryFn: async () => {

            const response = await getAllRobotsAPI();
            if (response?.status === 200 || response?.status === 201) {
                // setRobotsDropdown(response.data.data.records)
                setRobotsDropdown(robotType)
                return response.data;
            }
            throw new Error("Failed to fetch robots");
        },
        refetchOnWindowFocus: false,
        staleTime: 0,
        enabled: true,
    });
    const handleFetchEstimations = () => {
    };
    return (
        <div className="absolute z-10 top-4 right-4 bg-white shadow-2xl rounded-2xl p-6 w-[400px] h-[85vh] space-y-4 ">
            <h2 className="text-lg font-semibold">Configure Robot</h2>
            <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-600">Field Name</label>
                <Input placeholder="Field Name" value={viewFieldData?.data?.field_name} disabled className="text-md font-bold text-black" />

            </div>
            {/* <div className="border rounded p-3 space-y-2 bg-gray-50">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">XAG’s P100 Pro</span>
                    <button className="text-gray-600">
                        📹
                    </button>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                    <span>🟧 100%</span>
                    <span>❌ 80%</span>
                    <span>🔋 100%</span>
                    <span>📍 100%</span>
                </div>
            </div> */}



            <div className="flex gap-2">
                <div className="relative w-1/2">
                    <label className="text-sm font-semibold text-gray-600">Rows Spacing</label>
                    <Input
                        type="number"
                        className="w-full border rounded px-3 py-2 text-sm"
                        placeholder="Row Spacing"
                        value={fieldRowsSettings.RowSpacing}
                        disabled
                    />
                </div>
                <div className="relative w-1/2">
                    <label className="text-sm font-semibold text-gray-600">Head Land Width</label>
                    <Input
                        type="number"
                        className="w-full border rounded px-3 py-2 text-sm"
                        placeholder="Head Land Width"
                        value={fieldRowsSettings.HeadLandWidth}
                        disabled
                    />
                </div>
            </div>

            <div className="flex gap-2">
                <div className="relative w-1/2">
                    <label className="text-sm font-semibold text-gray-600"> Rows Pattren</label>
                    <Input
                        type="text"
                        className="w-full border rounded px-3 py-2 text-sm"
                        placeholder="Row Pattern"
                        value={fieldRowsSettings.RowPattern}
                        disabled
                    />
                </div>
                <div className="relative w-1/2">
                    <label className="text-sm font-semibold text-gray-600"> Steps Size</label>
                    <Input
                        type="number"
                        className="w-full border rounded px-3 py-2 text-sm"
                        placeholder="Step Size"
                        value={fieldRowsSettings.StepSize}
                        disabled
                    />
                </div>
            </div>
            {robotsDropdown && (

                <DropDownPoper data={robotsDropdown} type="robots" isLoading={isLoadingRobots} />
            )}





            <button className="bg-gray-700 text-white text-sm rounded px-4 py-2 w-full" onClick={handleFetchEstimations}>
                Fetch Estimations
            </button>
            {/* <div className="bg-gray-100 rounded p-4">
                <h3 className="text-sm font-semibold mb-2">Estimated</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white rounded p-2">🔋 Battery</div>
                    <div className="bg-white rounded p-2">⏳ Time</div>
                    <div className="bg-white rounded p-2">⬍ Swat length</div>
                    <div className="bg-white rounded p-2">🧪 Pesticides</div>
                    <div className="bg-white rounded p-2 col-span-2">⛽ Fuel</div>
                </div>

                <div className="mt-3 text-xs text-blue-600 font-medium">
                    Operating Parameters<br />
                    6.2 L/acres, 3.5 m, 5.0 m/s
                </div>
            </div> */}
        </div>
    );
};

export default ConfigRobotForm;
