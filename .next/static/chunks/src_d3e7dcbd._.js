(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/hooks/useSortColumns.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useSortColumns": ()=>useSortColumns
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useSortColumns(param) {
    let { options } = param;
    _s();
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    const [columnIcon, setColumnIcon] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortColumn, setSortColumn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("fullName");
    const [sortedOptions, setSortedOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(options);
    const toggleSortOrder = ()=>{
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setColumnIcon(columnIcon === "↓" ? "↑" : "↓");
    };
    const sortColumnByArgument = (column)=>{
        toggleSortOrder();
        setSortColumn(column);
        const sortedOptionsList = [
            ...options !== null && options !== void 0 ? options : []
        ].sort((a, b)=>{
            if (typeof a[column] === "string" && typeof b[column] === "string") {
                if (sortOrder === "asc") {
                    return a[column].localeCompare(b[column]);
                } else {
                    return b[column].localeCompare(a[column]);
                }
            } else if (typeof a[column] === "number" && typeof b[column] === "number") {
                if (sortOrder === "asc") {
                    return a[column] - b[column];
                } else {
                    return b[column] - a[column];
                }
            } else if (Array.isArray(a[column]) && Array.isArray(b[column])) {
                if (sortOrder === "asc") {
                    return a[column].length - b[column].length;
                } else {
                    return b[column].length - a[column].length;
                }
            } else {
                return 0;
            }
        });
        setSortedOptions(sortedOptionsList);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSortColumns.useEffect": ()=>{
            setSortColumn("fullName");
            setSortedOptions(options);
        }
    }["useSortColumns.useEffect"], [
        options
    ]);
    return {
        sortOrder,
        setSortOrder,
        columnIcon,
        setColumnIcon,
        sortColumn,
        setSortColumn,
        sortedOptions,
        setSortedOptions,
        toggleSortOrder,
        sortColumnByArgument
    };
}
_s(useSortColumns, "yqWgbf84tOhpI+xggs5EaFjV1rk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/teamsSummary/SummaryTable.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SummaryTable": ()=>SummaryTable
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSortColumns$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useSortColumns.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$DataContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/DataContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const SummaryTable = ()=>{
    _s();
    const { dataByTeamId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$DataContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataContext"]);
    const sortableTeams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SummaryTable.useMemo[sortableTeams]": ()=>{
            const sortableTeamsData = [];
            dataByTeamId.forEach({
                "SummaryTable.useMemo[sortableTeams]": (team)=>{
                    sortableTeamsData.push({
                        name: team.team.name,
                        currentSalaries: team.totals.currentSalary,
                        currentMargin: 220 - team.totals.currentSalary,
                        previousRaters: team.totals.rater2024,
                        currentRaters: team.totals.rater2025,
                        id: team.team.id
                    });
                }
            }["SummaryTable.useMemo[sortableTeams]"]);
            return sortableTeamsData;
        }
    }["SummaryTable.useMemo[sortableTeams]"], [
        dataByTeamId
    ]);
    const { columnIcon, sortColumn, sortedOptions, sortColumnByArgument } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSortColumns$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortColumns"])({
        options: sortableTeams
    });
    const tableContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SummaryTable.useMemo[tableContent]": ()=>{
            return sortedOptions.map({
                "SummaryTable.useMemo[tableContent]": (team)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                children: team.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                                lineNumber: 39,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                children: team.currentSalaries
                            }, void 0, false, {
                                fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                                lineNumber: 40,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                children: team.currentMargin
                            }, void 0, false, {
                                fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                                lineNumber: 41,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                children: team.previousRaters.toFixed(2)
                            }, void 0, false, {
                                fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                                lineNumber: 42,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                children: team.currentRaters.toFixed(2)
                            }, void 0, false, {
                                fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                                lineNumber: 43,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, team.id, true, {
                        fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                        lineNumber: 38,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
            }["SummaryTable.useMemo[tableContent]"]);
        }
    }["SummaryTable.useMemo[tableContent]"], [
        sortedOptions
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Masses salariales"
            }, void 0, false, {
                fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    onClick: ()=>sortColumnByArgument("name"),
                                    style: {
                                        cursor: "pointer"
                                    },
                                    children: [
                                        "Équipe ",
                                        sortColumn === "name" ? columnIcon : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    onClick: ()=>sortColumnByArgument("currentSalaries"),
                                    style: {
                                        cursor: "pointer"
                                    },
                                    children: [
                                        "Salaires ",
                                        sortColumn === "currentSalaries" ? columnIcon : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    onClick: ()=>sortColumnByArgument("currentMargin"),
                                    style: {
                                        cursor: "pointer"
                                    },
                                    children: [
                                        "Marge ",
                                        sortColumn === "currentMargin" ? columnIcon : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    onClick: ()=>sortColumnByArgument("previousRaters"),
                                    style: {
                                        cursor: "pointer"
                                    },
                                    children: [
                                        "PR passé ",
                                        sortColumn === "previousRaters" ? columnIcon : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    onClick: ()=>sortColumnByArgument("currentRaters"),
                                    style: {
                                        cursor: "pointer"
                                    },
                                    children: [
                                        "PR actuel ",
                                        sortColumn === "currentRaters" ? columnIcon : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: tableContent
                    }, void 0, false, {
                        fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/teamsSummary/SummaryTable.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SummaryTable, "I0woN4LoQ+x1u7z3iYBEtGKVZV8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useSortColumns$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortColumns"]
    ];
});
_c = SummaryTable;
var _c;
__turbopack_context__.k.register(_c, "SummaryTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/TeamsSummary.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TeamsSummary": ()=>TeamsSummary
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$teamsSummary$2f$SummaryTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/teamsSummary/SummaryTable.tsx [app-client] (ecmascript)");
"use client";
;
;
const TeamsSummary = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$teamsSummary$2f$SummaryTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SummaryTable"], {}, void 0, false, {
            fileName: "[project]/src/pages/TeamsSummary.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/pages/TeamsSummary.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = TeamsSummary;
var _c;
__turbopack_context__.k.register(_c, "TeamsSummary");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_d3e7dcbd._.js.map