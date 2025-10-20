(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "computeNewSalary": ()=>computeNewSalary,
    "downloadElement": ()=>downloadElement,
    "getDataByTeamId": ()=>getDataByTeamId,
    "getNewSalariesByPlayerId": ()=>getNewSalariesByPlayerId,
    "getTeamStatsAfterTrade": ()=>getTeamStatsAfterTrade,
    "getTeamTotals": ()=>getTeamTotals,
    "parseNegativeValue": ()=>parseNegativeValue,
    "parseRanking": ()=>parseRanking,
    "reduceStats": ()=>reduceStats
});
const parseNegativeValue = (value, limit)=>{
    const trueLimit = limit !== null && limit !== void 0 ? limit : 0;
    return value < trueLimit ? trueLimit : value;
};
const computeNewSalary = (salary, keeperHistory, omitDelta, raterDelta)=>{
    const valueWithKeeps = keeperHistory >= 2 ? salary + (keeperHistory - 1) * 5 : salary;
    if (!raterDelta || omitDelta) {
        return valueWithKeeps;
    }
    if (raterDelta < -3) {
        return valueWithKeeps - 5;
    } else if (raterDelta < -2.5) {
        return valueWithKeeps - 4;
    } else if (raterDelta < -2) {
        return valueWithKeeps - 3;
    } else if (raterDelta < -1.5) {
        return valueWithKeeps - 2;
    } else if (raterDelta < -1) {
        return valueWithKeeps - 1;
    } else if (raterDelta < -0.5) {
        return valueWithKeeps;
    } else if (raterDelta < 0.5) {
        return valueWithKeeps + 1;
    } else if (raterDelta < 1.5) {
        return valueWithKeeps + 2;
    } else if (raterDelta < 2) {
        return valueWithKeeps + 3;
    } else if (raterDelta < 3) {
        return valueWithKeeps + 4;
    } else {
        return valueWithKeeps + 5;
    }
};
const getNewSalariesByPlayerId = (team)=>{
    const salariesMap = new Map();
    team === null || team === void 0 ? void 0 : team.roster.forEach((player)=>{
        salariesMap.set(player.id, parseNegativeValue(computeNewSalary(player.salary, player.keeperHistory.length, player.previousRater === 0, player.currentRater - parseNegativeValue(player.previousRater)), 1));
    });
    return salariesMap;
};
const getTeamTotalProjectedSalary = (newSalariesByPlayerId)=>{
    const salaries = [];
    newSalariesByPlayerId.forEach((value)=>{
        salaries.push(value);
    });
    if (!salaries.length) {
        return 0;
    }
    return salaries.reduce((partialSum, a)=>partialSum + a, 0);
};
const getTeamKeepersSalaries = (newSalariesByPlayerId, keepers)=>{
    const salaries = [];
    if (!keepers || keepers.length === 0) {
        return 0;
    }
    keepers.forEach((id)=>{
        const value = newSalariesByPlayerId.get(id);
        if (value) {
            salaries.push(value);
        }
    });
    if (salaries.length === 0) {
        return 0;
    }
    return salaries.reduce((partialSum, a)=>partialSum + a, 0);
};
const reduceStats = (stats)=>{
    return stats.reduce((partialSum, a)=>{
        return {
            FGA: partialSum.FGA + a.FGA,
            FGM: partialSum.FGM + a.FGM,
            FTA: partialSum.FTA + a.FTA,
            FTM: partialSum.FTM + a.FTM,
            "3PM": partialSum["3PM"] + a["3PM"],
            REB: partialSum.REB + a.REB,
            AST: partialSum.AST + a.AST,
            STL: partialSum.STL + a.STL,
            BLK: partialSum.BLK + a.BLK,
            TO: partialSum.TO + a.TO,
            PTS: partialSum.PTS + a.PTS
        };
    }, {
        FGA: 0,
        FGM: 0,
        FTA: 0,
        FTM: 0,
        "3PM": 0,
        REB: 0,
        AST: 0,
        STL: 0,
        BLK: 0,
        TO: 0,
        PTS: 0
    });
};
const getTeamTotals = (team, newSalariesByPlayerId, keepers)=>{
    const rater2024 = team.roster.map((player)=>player.previousRater).reduce((partialSum, a)=>partialSum + a, 0);
    const rater2025 = team.roster.map((player)=>player.currentRater).reduce((partialSum, a)=>partialSum + a, 0);
    const currentSalary = team.roster.filter((player)=>!player.injuredSpot).map((player)=>player.salary).reduce((partialSum, a)=>partialSum + a, 0);
    const stats = reduceStats(team.roster.map((player)=>player.detailedStats));
    const projectedSalary = getTeamTotalProjectedSalary(newSalariesByPlayerId);
    const projectedKeepersSalaries = getTeamKeepersSalaries(newSalariesByPlayerId, keepers);
    return {
        rater2025,
        rater2024,
        currentSalary,
        projectedSalary,
        projectedKeepersSalaries,
        stats
    };
};
const parseRanking = (ranking)=>{
    if (ranking < 1) {
        return "erreur";
    } else if (ranking === 1) {
        return "1er";
    } else {
        return "".concat(ranking, "e");
    }
};
const getTeamStatsAfterTrade = (teamStats, outStats, inStats)=>{
    const fg = teamStats.FGM / teamStats.FGA - (teamStats.FGM - outStats.FGM + inStats.FGM) / (teamStats.FGA - outStats.FGA + inStats.FGA);
    const ft = teamStats.FTM / teamStats.FTA - (teamStats.FTM - outStats.FTM + inStats.FTM) / (teamStats.FTA - outStats.FTA + inStats.FTA);
    return {
        FG: fg,
        FT: ft,
        "3PM": inStats["3PM"] - outStats["3PM"],
        REB: inStats.REB - outStats.REB,
        AST: inStats.AST - outStats.AST,
        STL: inStats.STL - outStats.STL,
        BLK: inStats.BLK - outStats.BLK,
        TO: inStats.TO - outStats.TO,
        PTS: inStats.PTS - outStats.PTS
    };
};
const getDataByTeamId = (teams, selectedKeepers)=>{
    const dataMap = new Map();
    teams.forEach((team)=>{
        const newSalariesByPlayerId = getNewSalariesByPlayerId(team);
        const teamData = getTeamTotals(team, newSalariesByPlayerId, selectedKeepers);
        dataMap.set(team.id, {
            newSalariesByPlayerId,
            totals: teamData,
            team
        });
    });
    return dataMap;
};
const downloadElement = (data, fileName, setIsUpdating)=>{
    const element = document.createElement("a");
    const textFile = new Blob([
        JSON.stringify(data)
    ], {
        type: "application/json"
    });
    element.href = URL.createObjectURL(textFile);
    element.download = fileName + ".json";
    document.body.appendChild(element);
    element.click();
    if (setIsUpdating) {
        setIsUpdating(false);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/DataContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "DataContext": ()=>DataContext,
    "DataProvider": ()=>DataProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const DataContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
const DataProvider = (param)=>{
    let { children } = param;
    _s();
    const [activeTeamId, setActiveTeamId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedKeepers, setSelectedKeepers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [teams, setTeams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [unpickablePlayers, setUnpickablePlayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lastUpdate, setLastUpdate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [isUpdating, setIsUpdating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Load initial data from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataProvider.useEffect": ()=>{
            const loadData = {
                "DataProvider.useEffect.loadData": async ()=>{
                    try {
                        const response = await fetch("/api/rosters");
                        if (!response.ok) {
                            throw new Error("Failed to fetch rosters");
                        }
                        const data = await response.json();
                        setTeams(data.teams);
                        setUnpickablePlayers(data.unpickablePlayers);
                        setLastUpdate(new Date(data.lastUpdate));
                    } catch (error) {
                        console.error("Error loading data:", error);
                    // Fallback to empty state or handle error as needed
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["DataProvider.useEffect.loadData"];
            loadData();
        }
    }["DataProvider.useEffect"], []);
    const dataByTeamId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DataProvider.useMemo[dataByTeamId]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDataByTeamId"])(teams, selectedKeepers);
        }
    }["DataProvider.useMemo[dataByTeamId]"], [
        selectedKeepers,
        teams
    ]);
    const handleDataRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataProvider.useCallback[handleDataRefresh]": (newTeams, newUnpickables, newUpdate)=>{
            setTeams(newTeams);
            setUnpickablePlayers(newUnpickables);
            setLastUpdate(newUpdate);
            setIsUpdating(false);
        }
    }["DataProvider.useCallback[handleDataRefresh]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataContext.Provider, {
        value: {
            teams,
            activeTeamId,
            setActiveTeamId,
            selectedKeepers,
            setSelectedKeepers,
            dataByTeamId,
            unpickablePlayers,
            lastUpdate,
            handleDataRefresh,
            isUpdating,
            setIsUpdating,
            isLoading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/DataContext.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DataProvider, "DwwelxqA40SBAnKf8Cot5PPnJPY=");
_c = DataProvider;
var _c;
__turbopack_context__.k.register(_c, "DataProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/utils/style.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createStyles": ()=>createStyles,
    "rootColors": ()=>rootColors
});
const createStyles = ()=>(v)=>v;
const rootColors = {
    primary: "#e45e04",
    background: "#242424",
    fontColor: "#ffeede",
    componentBackground: "#030100"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/NavButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "NavButton": ()=>NavButton
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$style$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/style.ts [app-client] (ecmascript)");
;
;
const NavButton = (param)=>{
    let { buttonIcon, isDisabled, onClickButton } = param;
    const styles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$style$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStyles"])()({
        button: {
            borderRadius: "1.25rem",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
            width: "2rem",
            height: "2rem",
            transition: "all 0.5s",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    });
    const NavIcon = buttonIcon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        style: styles.button,
        disabled: isDisabled,
        onClick: onClickButton,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavIcon, {}, void 0, false, {
            fileName: "[project]/src/components/NavButton.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/NavButton.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = NavButton;
var _c;
__turbopack_context__.k.register(_c, "NavButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Header.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Header": ()=>Header
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$style$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/style.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NavButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Groups$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Groups.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CompareArrows$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/CompareArrows.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$AssistWalker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/AssistWalker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Leaderboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Leaderboard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Gavel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Gavel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$QueryStats$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/QueryStats.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$AutoStories$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/AutoStories.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$DataContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/DataContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const Header = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { setSelectedKeepers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$DataContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataContext"]);
    const styles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$style$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStyles"])()({
        header: {
            height: "5.5rem"
        },
        h1: {
            fontSize: "2rem",
            textAlign: "center",
            color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$style$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rootColors"].primary,
            marginBottom: "0.5rem"
        },
        nav: {
            width: "100%",
            height: "2rem",
            padding: "0 0.5rem",
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "space-evenly"
        }
    });
    const navButtonsProps = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Groups$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            navigateTo: "/"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$CompareArrows$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            navigateTo: "/trade"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Leaderboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            navigateTo: "/teams"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$AssistWalker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            navigateTo: "/injuries"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$QueryStats$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            navigateTo: "/advanced"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$AutoStories$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            navigateTo: "history"
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Gavel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            navigateTo: "/rules"
        }
    ];
    const handleNavigation = (path)=>{
        router.push(path);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: styles.header,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: styles.h1,
                children: "🏀 Fantasy league BBF 🏀"
            }, void 0, false, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                style: styles.nav,
                children: navButtonsProps.map((navButton, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NavButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavButton"], {
                        buttonIcon: navButton.icon,
                        onClickButton: ()=>{
                            setSelectedKeepers([]);
                            handleNavigation(navButton.navigateTo);
                        }
                    }, index, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Header.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Header, "RX/koTYEcizZwTqt068DxO2HTMM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_e5538090._.js.map