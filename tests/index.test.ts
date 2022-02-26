import StateManager from "../src/StateManager/SM/StateManager"
import { stateGenerator } from "../src/StateManager/stateGenerator"
import { State, StateDescriptor } from "../src/StateManager/stateManagementTypes"

// const sm = new StateManager()
// const sum = (a: number, b: number) => {
//     return a + b
// };

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3)
// })



const stateDescription: StateDescriptor = {
    map: [
        ["H", "SHIP"],
        ["W", "W"]
    ],
    players: [
        {
            name: "Luis",
            color: "blue",
            capital: {
                x: 0,
                y: 0
            }
        }
    ]
}

const stateGenerated: State = stateGenerator(stateDescription)

test("State generator assigns block types correctly", () => {
    expect(stateGenerated.map[0][0].type).toBe("H")
    expect(stateGenerated.map[0][1].type).toBe("SHIP")
    expect(stateGenerated.map[1][0].type).toBe("W")
    expect(stateGenerated.map[1][1].type).toBe("W")
})

test("State generator sets the players correctly", () => {
    expect(stateGenerated.players.get("Luis")?.name).toBe("Luis")
})

test("State generator sets block owners correctly", () => {
    expect(stateGenerated.map[0][0].ownerName).toBe("Luis")
})
