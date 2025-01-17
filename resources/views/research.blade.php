<!DOCTYPE HTML>
<html>
    <head>
        <title>Monty Hall - Research Page</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('css/research.css') }}" rel="stylesheet">
        <script src="{{ URL::asset('js/game.js') }}" type="text/javascript" defer></script>
        @livewireStyles
        @livewireScripts
    </head>
    <body>
        <x-navigation/>
        <div class="page">
            <section class="right">
                @livewire('research')
            </section>
            <section class="left">
                <div id="error"></div>
                <div id="settingsArea">
                    <div id="tableDiv">
                        <table id="cmTable" width=20%>
                            <tr>
                                <th colspan="3">Custom Monty Settings</th>
                            </tr>
                            <tr>
                                <th>Door 1</th>
                                <th>Door 2</th>
                                <th>Door 3</th>
                            </tr>
                            <tr>
                                <td><input type="text" id="cmTableText1" class="cmTableText" value="0.3333" placeholder="0 - 1" onchange="updateCMProb(this.value, 0)"></td>
                                <td><input type="text" id="cmTableText2" class="cmTableText" value="0.3333" placeholder="0 - 1" onchange="updateCMProb(this.value, 1)"></td>
                                <td><input type="text" id="cmTableText3" class="cmTableText" value="0.3334" placeholder="0 - 1" onchange="updateCMProb(this.value, 2)"></td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <label class="cmLabel" for="cmAllowOpenSelected">Allow Open Selected:</label>
                                    <div><input type="checkbox" id="cmAllowOpenSelected" onchange="setCMAllowOpenSelected(this.checked)"></div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <label class="cmLabel" for="cmAllowOpenPrize">Allow Open Prize:</label>
                                    <div><input type="checkbox" id="cmAllowOpenPrize" onchange="setCMAllowOpenPrize(this.checked)"></div>
                                </td>
                            </tr>
                        </table>
                        <table id="pTable">
                            <tr>
                                <th colspan="4">Player Behavior</th>
                            </tr>
                            <tr>
                                <th class="pTableHeader"></th>
                                <th class="pTableHeader">Door 1</th>
                                <th class="pTableHeader">Door 2</th>
                                <th class="pTableHeader">Door 3</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input type="text" id="pTableText1" class="pTableText" value="0.3333" placeholder="0 - 1" onchange="updatePProb(this.value, 0)"></td>
                                <td><input type="text" id="pTableText2" class="pTableText" value="0.3333" placeholder="0 - 1" onchange="updatePProb(this.value, 1)"></td>
                                <td><input type="text" id="pTableText3" class="pTableText" value="0.3334" placeholder="0 - 1" onchange="updatePProb(this.value, 2)"></td>
                            </tr>
                            <tr>
                                <td colspan="4">Chance to switch from (row) to (column)</td>
                            </tr>
                            <tr>
                                <th class="pTableHeader"></th>
                                <th class="pTableHeader">Door 1</th>
                                <th class="pTableHeader">Door 2</th>
                                <th class="pTableHeader">Door 3</th>
                            </tr>
                            <tr>
                                <th class="pTableMatrixText">Door 1</th>
                                <td>X</td>
                                <td><input type="text" id="pTableText12" class="pTableMatrixText" value="0.0" placeholder="0 - 1" onchange="updatePMat(this.value, 0, 1)"></td>
                                <td><input type="text" id="pTableText13" class="pTableMatrixText" value="0.0" placeholder="0 - 1" onchange="updatePMat(this.value, 0, 2)"></td>
                            </tr>
                            <tr>
                                <th class="pTableMatrixText">Door 2</th>
                                <td><input type="text" id="pTableText21" class="pTableMatrixText" value="0.0" placeholder="0 - 1" onchange="updatePMat(this.value, 1, 0)"></td>
                                <td>X</td>
                                <td><input type="text" id="pTableText23" class="pTableMatrixText" value="0.0" placeholder="0 - 1" onchange="updatePMat(this.value, 1, 2)"></td>
                            </tr>
                            <tr>
                                <th class="pTableMatrixText">Door 3</th>
                                <td><input type="text" id="pTableText31" class="pTableMatrixText" value="0.0" placeholder="0 - 1" onchange="updatePMat(this.value, 2, 0)"></td>
                                <td><input type="text" id="pTableText32" class="pTableMatrixText" value="0.0" placeholder="0 - 1" onchange="updatePMat(this.value, 2, 1)"></td>
                                <td>X</td>
                            </tr>

                        </table>
                    </div>
                    <div class="montySelection">
                        <label for="montySelect">Choose a variation of Monty to test: <br/> </label>
                        <select name="montySelect" id="montySelect" onchange="updateMontyVariant(this.value)">
                            <option>Standard Monty</option>
                            <option>Ignorant Monty</option>
                            <option>Angelic Monty</option>
                            <option>Evil Monty</option>
                            <option>Monty from Hell</option>
                            <option>Monty Crawl</option>
                            <option>Custom Monty</option>
                        </select>
                    </div>
                    <div class="box">
                        <label for="simCount"> Choose how many simulations to run: <br/> </label>
                        <input type="number" id="simCountBox" value="10" placeholder="#" min="0" max="10000"
                            onchange="updateTotalSims(this.value)">
                    </div>
                    <div class="box">
                        <button id="stepBtn" onclick="gameStep()">Step</button>
                        <button id="nextBtn" onclick="gameNext()">Next</button>
                        <button id="runAllBtn" onclick="gameRunAll()">Run All</button>
                    </div>
                    <div class="box">
                        <label for="prizeCheck">Show prize:</label>
                        <input type="checkbox" id="prizeCheck" onchange="setShowPrize(this.checked)">
                    </div>
                    <div class="box">
                        <label for="animSpeedBox">Animation speed: <br/></label>
                        <input type="number" id="animSpeedBox" value="1" placeholder="#" min="0" max="5"
                            onchange="updateAnimSpeed(this.value)">
                    </div>
                </div>
                <div id="dataArea">
                    <div class="box">
                        <div id="currSimInfo">
                            <label for="id_main_container">Current Simulation: </label>
                            <div class="main_container" id="id_main_container">
                                <div class="container_inner" id="display_div_id"></div>
                            </div>
                        </div>
                        <div class="progBar">
                            <span id="progBarSpan" style="width: 0%"></span>
                        </div>
                        <div id="wlNums">
                            <span>Wins: <span id="wins">0</span></span>
                            <span>Losses: <span id="losses">0</span></span>
                            <span>W/L: <span id="wl">-</span></span>
                            <span>Win %: <span id="winPercent">-</span> </span>
                            <span>Monty Opened Prize: <span id="montyOpenedPrize">0</span> </span>
                        </div>
                        <p id="switchTitleText">Stats when player DID get a chance to switch:</p>
                        <div id="wlNumsSwitch">
                            <span>Wins: <span id="winsWithSwitch">0</span> </span>
                            <span>Losses: <span id="lossesWithSwitch">0</span> </span>
                            <span>Total: <span id="totalWithSwitch">10</span> </span>
                            <span>Win %: <span id="winPercentWithSwitch">-</span> </span>
                        </div>
                        <br/>
                        <button id="resetBtn" onclick="simReset()">Reset</button>
                    </div>
                </div>
            </section>
        </div>
        <x-footer/>
    </body>
</html>
