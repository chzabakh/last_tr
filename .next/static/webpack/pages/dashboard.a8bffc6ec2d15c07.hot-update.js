"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboard",{

/***/ "./src/components/Sections/edit.tsx":
/*!******************************************!*\
  !*** ./src/components/Sections/edit.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _TwoFac__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TwoFac */ \"./src/components/Sections/TwoFac.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst Edit = ()=>{\n    _s();\n    const [showTwoFac, setShowTwoFac] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [Preview, setPreview] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [Avatar, setAvatar] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [Username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [isAvatarChanged, setIsAvatarChanged] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isUsernameChanged, setIsUsernameChanged] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        getAvatar();\n        getNick();\n    }, []);\n    // Function to handle the button click and show the <TwoFac> component\n    function handleAuthClick() {\n        setShowTwoFac(true);\n    }\n    function handleAvatarPreview(e) {\n        var _e_target_files;\n        const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];\n        if (file) {\n            const previewUrl = URL.createObjectURL(file);\n            setPreview(previewUrl);\n        }\n    }\n    function handleAvatarChange(e) {\n        var _e_target_files;\n        const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];\n        if (file) {\n            const previewUrl = URL.createObjectURL(file);\n            setPreview(previewUrl);\n            setIsAvatarChanged(true);\n            setAvatar(file); // Save the file in the state for later submission\n        } else {\n            alert(\"Upload the file you MF!\");\n        }\n    }\n    async function getAvatar() {\n        try {\n            const Token = localStorage.getItem(\"token\");\n            const headers = {\n                Authorization: \"Bearer \".concat(Token)\n            };\n            const res = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"http://localhost:9000/users/me\", {\n                headers\n            });\n            const avatar = res.data.avatarPic;\n            console.log(res.data);\n            setPreview(avatar);\n        } catch (err) {\n            console.log(err);\n        }\n    }\n    async function getNick() {\n        try {\n            const Token = localStorage.getItem(\"token\");\n            const headers = {\n                Authorization: \"Bearer \".concat(Token)\n            };\n            const res = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"http://localhost:9000/users/me\", {\n                headers\n            });\n            const nickname = res.data.nickname;\n            console.log(res.data);\n            setUsername(nickname);\n        } catch (err) {\n            console.log(err);\n        }\n    }\n    async function handleSaveChanges() {\n        try {\n            if (Avatar) {\n                const data = new FormData();\n                data.append(\"avatarPic\", Avatar);\n                const token = localStorage.getItem(\"token\");\n                const headers = {\n                    \"Content-Type\": \"multipart/form-data\",\n                    Authorization: \"Bearer \".concat(token)\n                };\n                await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].patch(\"http://localhost:9000/users/upload/avatar\", data, {\n                    headers\n                });\n                alert(\"Avatar updated!\");\n                window.location.reload();\n            }\n            if (Username) {\n                const Token = localStorage.getItem(\"token\");\n                const headers = {\n                    Authorization: \"Bearer \".concat(Token)\n                };\n                const data = {\n                    nickname: Username\n                };\n                await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].patch(\"http://localhost:9000/users/me/settings/change-username\", data, {\n                    headers\n                });\n                alert(\"Username changed!\");\n            }\n        } catch (err) {\n            alert(\"Failed to save changes!\");\n            console.log(err);\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: !showTwoFac ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"my-20 h-[70%] gap-3 justify-center flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-white bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"border-2 flex overflow-scroll flex-col justify-between gap-10  h-[90%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col gap-10 bg-black/20\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"bg-black/20\",\n                                children: \"Change the Avatar:\"\n                            }, void 0, false, {\n                                fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                lineNumber: 124,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {\n                                src: Preview,\n                                alt: \"\",\n                                width: 200,\n                                height: 200\n                            }, void 0, false, {\n                                fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                lineNumber: 125,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"file\",\n                                accept: \".jpg, .jpeg, .png\",\n                                onChange: (e)=>{\n                                    handleAvatarChange(e);\n                                    handleAvatarPreview(e);\n                                }\n                            }, void 0, false, {\n                                fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                lineNumber: 126,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                        lineNumber: 123,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col gap-10 bg-black/20\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex flex-row gap-10\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"bg-black/20 flex-1 max-w-md\",\n                                    children: \"Change username:\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                    lineNumber: 138,\n                                    columnNumber: 11\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    className: \"p-2 rounded-lg  text-white bg-black/60 flex-1 max-w-sm\",\n                                    value: Username,\n                                    type: \"text\",\n                                    placeholder: \"Type new username\",\n                                    onChange: (e)=>setUsername(e.target.value)\n                                }, void 0, false, {\n                                    fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                    lineNumber: 139,\n                                    columnNumber: 11\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                            lineNumber: 137,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                        lineNumber: 136,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col justify-between\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex justify-between\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"bg-black p-3 rounded-2xl\",\n                                    onClick: handleAuthClick,\n                                    children: \" Activate auth\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                    lineNumber: 156,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"bg-black p-3 rounded-2xl\",\n                                    onClick: handleSaveChanges,\n                                    children: \"Save changes\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                                    lineNumber: 157,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                            lineNumber: 155,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                        lineNumber: 153,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                lineNumber: 122,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n            lineNumber: 121,\n            columnNumber: 9\n        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"h-screen w-full md:w-[90%] flex mx-auto \",\n            children: [\n                showTwoFac && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_TwoFac__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                    fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n                    lineNumber: 165,\n                    columnNumber: 22\n                }, undefined),\n                \" \"\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/com/Desktop/last_transcendance/src/components/Sections/edit.tsx\",\n            lineNumber: 164,\n            columnNumber: 14\n        }, undefined)\n    }, void 0, false);\n};\n_s(Edit, \"UWhzJwXRDcbOr21xBjRqMJ3bUEc=\");\n_c = Edit;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Edit);\nvar _c;\n$RefreshReg$(_c, \"Edit\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPWCxXQUFVO29DQUEyQlksU0FBUzlDOzhDQUFpQjs7Ozs7OzhDQUN2RSw4REFBQzZDO29DQUFPWCxXQUFVO29DQUEyQlksU0FBU3JCOzhDQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NDQU8zRSw4REFBQ1E7WUFBSUMsV0FBVTs7Z0JBQ3JCaEQsNEJBQWMsOERBQUNMLCtDQUFNQTs7Ozs7Z0JBQUk7Ozs7Ozs7O0FBSWhDO0dBaktNSTtLQUFBQTtBQW1LTiwrREFBZUEsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9ucy9lZGl0LnRzeD83YTBmIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFR3b0ZhYyBmcm9tICcuL1R3b0ZhYydcbmltcG9ydCB7IHVzZVN0YXRlLCBDaGFuZ2VFdmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuY29uc3QgRWRpdCA9ICgpID0+IHtcblxuICAgIGNvbnN0IFtzaG93VHdvRmFjLCBzZXRTaG93VHdvRmFjXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbUHJldmlldywgc2V0UHJldmlld10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgICBjb25zdCBbQXZhdGFyLCBzZXRBdmF0YXJdID0gdXNlU3RhdGU8RmlsZSB8IG51bGw+KG51bGwpO1xuICAgIGNvbnN0IFtVc2VybmFtZSwgc2V0VXNlcm5hbWVdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtpc0F2YXRhckNoYW5nZWQsIHNldElzQXZhdGFyQ2hhbmdlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2lzVXNlcm5hbWVDaGFuZ2VkLCBzZXRJc1VzZXJuYW1lQ2hhbmdlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgZ2V0QXZhdGFyKCk7XG4gICAgICBnZXROaWNrKCk7XG4gICAgfSwgW10pO1xuICAgIC8vIEZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgYnV0dG9uIGNsaWNrIGFuZCBzaG93IHRoZSA8VHdvRmFjPiBjb21wb25lbnRcblxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQXV0aENsaWNrKCkge1xuICAgICAgc2V0U2hvd1R3b0ZhYyh0cnVlKTtcbiAgICB9XG5cbiAgICBcbiAgICBmdW5jdGlvbiBoYW5kbGVBdmF0YXJQcmV2aWV3KGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KVxuICAgIHtcbiAgICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlcz8uWzBdO1xuICAgICAgaWYoZmlsZSlcbiAgICAgIHtcbiAgICAgICAgY29uc3QgcHJldmlld1VybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICAgIHNldFByZXZpZXcocHJldmlld1VybCk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGhhbmRsZUF2YXRhckNoYW5nZShlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xuICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICBjb25zdCBwcmV2aWV3VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgICAgICAgc2V0UHJldmlldyhwcmV2aWV3VXJsKTtcbiAgICAgICAgc2V0SXNBdmF0YXJDaGFuZ2VkKHRydWUpO1xuICAgICAgICBzZXRBdmF0YXIoZmlsZSk7IC8vIFNhdmUgdGhlIGZpbGUgaW4gdGhlIHN0YXRlIGZvciBsYXRlciBzdWJtaXNzaW9uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydCgnVXBsb2FkIHRoZSBmaWxlIHlvdSBNRiEnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0QXZhdGFyKClcbiAgICB7XG4gICAgICB0cnlcbiAgICAgIHtcbiAgICAgICAgICBjb25zdCBUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7QXV0aG9yaXphdGlvbjogYEJlYXJlciAke1Rva2VufWB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjkwMDAvdXNlcnMvbWUnLCB7aGVhZGVyc30pOyBcbiAgICAgICAgICBjb25zdCBhdmF0YXIgPSByZXMuZGF0YS5hdmF0YXJQaWM7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgc2V0UHJldmlldyhhdmF0YXIpO1xuXG4gICAgICB9XG4gICAgICBjYXRjaChlcnIpXG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXROaWNrKClcbiAgICB7XG4gICAgICB0cnlcbiAgICAgIHtcbiAgICAgICAgICBjb25zdCBUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSB7QXV0aG9yaXphdGlvbjogYEJlYXJlciAke1Rva2VufWB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjkwMDAvdXNlcnMvbWUnLCB7aGVhZGVyc30pOyBcbiAgICAgICAgICBjb25zdCBuaWNrbmFtZT0gcmVzLmRhdGEubmlja25hbWU7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgc2V0VXNlcm5hbWUobmlja25hbWUpO1xuXG4gICAgICB9XG4gICAgICBjYXRjaChlcnIpXG4gICAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlU2F2ZUNoYW5nZXMoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoQXZhdGFyKSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgIGRhdGEuYXBwZW5kKCdhdmF0YXJQaWMnLCBBdmF0YXIpO1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG4gICAgICAgICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGF3YWl0IGF4aW9zLnBhdGNoKCdodHRwOi8vbG9jYWxob3N0OjkwMDAvdXNlcnMvdXBsb2FkL2F2YXRhcicsIGRhdGEsIHsgaGVhZGVycyB9KTtcbiAgICAgICAgICBhbGVydCgnQXZhdGFyIHVwZGF0ZWQhJyk7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChVc2VybmFtZSkge1xuICAgICAgICAgIGNvbnN0IFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG4gICAgICAgICAgY29uc3QgaGVhZGVycyA9IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke1Rva2VufWAgfTtcbiAgICAgICAgICBjb25zdCBkYXRhID0geyBuaWNrbmFtZTogVXNlcm5hbWUgfTtcbiAgICAgICAgICBhd2FpdCBheGlvcy5wYXRjaCgnaHR0cDovL2xvY2FsaG9zdDo5MDAwL3VzZXJzL21lL3NldHRpbmdzL2NoYW5nZS11c2VybmFtZScsIGRhdGEsIHsgaGVhZGVycyB9KTtcbiAgICAgICAgICBhbGVydCgnVXNlcm5hbWUgY2hhbmdlZCEnKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gc2F2ZSBjaGFuZ2VzIScpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgICBcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAge1xuICAgICAgIXNob3dUd29GYWMgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXktMjAgaC1bNzAlXSBnYXAtMyBqdXN0aWZ5LWNlbnRlciBmbGV4IGZsZXgtY29sIHctZnVsbCBteC1bMnJlbV0gIGJvcmRlci0yIGJvcmRlci1vcGFjaXR5LTMwIGJvcmRlci12aW9sZXQtNDAwIGJnLW9wYWNpdHktMjAgYmctd2hpdGUgYmctYmx1ci1tZCBiYWNrZHJvcC1maWx0ZXIgYmFja2Ryb3AtYmx1ci1tZCBwLTQgcm91bmRlZC1bMzBweF1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXItMiBmbGV4IG92ZXJmbG93LXNjcm9sbCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTEwICBoLVs5MCVdIGJvcmRlci1vcGFjaXR5LTMwIGJvcmRlci12aW9sZXQtNDAwIGJnLW9wYWNpdHktNSBiZy1ncmFkaWVudC10by1sIGZyb20tW3JnYmEoMjU1LDI1NSwyNTUsMC4yMCldIGJnLWJsdXItbWQgYmFja2Ryb3AtZmlsdGVyIGJhY2tkcm9wLWJsdXItbWQgcC00IHJvdW5kZWQtWzMwcHhdXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXggZmxleC1jb2wgZ2FwLTEwIGJnLWJsYWNrLzIwJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWJsYWNrLzIwXCI+Q2hhbmdlIHRoZSBBdmF0YXI6PC9kaXY+XG4gICAgICAgICAgPEltYWdlIHNyYz17UHJldmlld30gYWx0PVwiXCIgd2lkdGg9ezIwMH0gaGVpZ2h0PXsyMDB9Lz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgIGFjY2VwdD1cIi5qcGcsIC5qcGVnLCAucG5nXCJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaGFuZGxlQXZhdGFyQ2hhbmdlKGUpO1xuICAgICAgICAgICAgICBoYW5kbGVBdmF0YXJQcmV2aWV3KGUpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGZsZXgtY29sIGdhcC0xMCBiZy1ibGFjay8yMCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXggZmxleC1yb3cgZ2FwLTEwJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYmctYmxhY2svMjAgZmxleC0xIG1heC13LW1kJz5DaGFuZ2UgdXNlcm5hbWU6PC9kaXY+XG4gICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnICB0ZXh0LXdoaXRlIGJnLWJsYWNrLzYwIGZsZXgtMSBtYXgtdy1zbVwiIHZhbHVlPXtVc2VybmFtZX0gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj0nVHlwZSBuZXcgdXNlcm5hbWUnIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VXNlcm5hbWUoZS50YXJnZXQudmFsdWUpfS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgey8qIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGZsZXgtcm93IGdhcC0xMCc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2JnLWJsYWNrLzIwIGZsZXgtMSBtYXgtdy1tZCc+Q2hhbmdlIGVtYWlsOjwvZGl2PlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyAgdGV4dC13aGl0ZSBiZy1ibGFjay82MCBmbGV4LTEgbWF4LXctc21cIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPSdUeXBlIG5ldyBlbWFpbCcvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiZy1ibGFjay8yMCc+Q2hhbmdlIHBhc3N3b3JkOiA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICBjbGFzc05hbWU9J2ZsZXggZmxleC1yb3cgZ2FwLTEwIGp1c3RpZnktY2VudGVyJz5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIHRleHQtd2hpdGUgYmctYmxhY2svNjBcIiB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj0nVHlwZSBvbGQgcGFzc3dvcmQnLz5cbiAgICAgICAgICAgICAgPGlucHV0ICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyB0ZXh0LXdoaXRlIGJnLWJsYWNrLzYwXCIgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9J1R5cGUgbmV3IHBhc3N3b3JkJy8+XG4gICAgICAgICAgPC9kaXY+ICovfVxuICAgICAgICAgIDwvZGl2PlxuICBcbiAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuJz5cbiAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGp1c3RpZnktYmV0d2Vlbic+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdiZy1ibGFjayBwLTMgcm91bmRlZC0yeGwnIG9uQ2xpY2s9e2hhbmRsZUF1dGhDbGlja30+IEFjdGl2YXRlIGF1dGg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2JnLWJsYWNrIHAtMyByb3VuZGVkLTJ4bCcgb25DbGljaz17aGFuZGxlU2F2ZUNoYW5nZXN9ID5TYXZlIGNoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgKSA6ICAgIDxkaXYgY2xhc3NOYW1lPVwiaC1zY3JlZW4gdy1mdWxsIG1kOnctWzkwJV0gZmxleCBteC1hdXRvIFwiPlxuICAgICAge3Nob3dUd29GYWMgJiYgPFR3b0ZhYyAvPn0gPC9kaXY+XG4gICAgfVxuICA8Lz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdDtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsIlR3b0ZhYyIsInVzZVN0YXRlIiwiSW1hZ2UiLCJheGlvcyIsIkVkaXQiLCJzaG93VHdvRmFjIiwic2V0U2hvd1R3b0ZhYyIsIlByZXZpZXciLCJzZXRQcmV2aWV3IiwiQXZhdGFyIiwic2V0QXZhdGFyIiwiVXNlcm5hbWUiLCJzZXRVc2VybmFtZSIsImlzQXZhdGFyQ2hhbmdlZCIsInNldElzQXZhdGFyQ2hhbmdlZCIsImlzVXNlcm5hbWVDaGFuZ2VkIiwic2V0SXNVc2VybmFtZUNoYW5nZWQiLCJnZXRBdmF0YXIiLCJnZXROaWNrIiwiaGFuZGxlQXV0aENsaWNrIiwiaGFuZGxlQXZhdGFyUHJldmlldyIsImUiLCJmaWxlIiwidGFyZ2V0IiwiZmlsZXMiLCJwcmV2aWV3VXJsIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiaGFuZGxlQXZhdGFyQ2hhbmdlIiwiYWxlcnQiLCJUb2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsInJlcyIsImdldCIsImF2YXRhciIsImRhdGEiLCJhdmF0YXJQaWMiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwibmlja25hbWUiLCJoYW5kbGVTYXZlQ2hhbmdlcyIsIkZvcm1EYXRhIiwiYXBwZW5kIiwidG9rZW4iLCJwYXRjaCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZGl2IiwiY2xhc3NOYW1lIiwic3JjIiwiYWx0Iiwid2lkdGgiLCJoZWlnaHQiLCJpbnB1dCIsInR5cGUiLCJhY2NlcHQiLCJvbkNoYW5nZSIsInZhbHVlIiwicGxhY2Vob2xkZXIiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Sections/edit.tsx\n"));

/***/ })

});