"use client"

import { useState, useEffect } from "react"

const App = () => {
  // State variables for bill details
  const [totalBill, setTotalBill] = useState("")
  const [taxCharges, setTaxCharges] = useState("")
  const [numPeople, setNumPeople] = useState(1)
  const [people, setPeople] = useState([]) // Array to store individual person data, now with itemCosts
  const [sharedItems, setSharedItems] = useState([])
  const [splitOption, setSplitOption] = useState("contributed")
  const [calculationResults, setCalculationResults] = useState(null)

  // Custom CSS to hide number input arrows (spinners)
  const spinnerStyles = `
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        input[type=number] {
            -moz-appearance: textfield;
        }
    `

  // Effect to initialize people array when numPeople changes
  useEffect(() => {
    const newPeople = Array.from({ length: numPeople }, (_, i) => {
      const existingPerson = people[i]
      return existingPerson
        ? {
            ...existingPerson,
            // Ensure itemCosts array length matches numberOfItems if it's already set
            itemCosts: existingPerson.itemCosts
              ? Array.from({ length: existingPerson.numberOfItems || 0 }, (_, j) => existingPerson.itemCosts[j] || "")
              : [],
          }
        : { id: `person-${i}`, name: "", numberOfItems: "", itemCosts: [] }
    })
    setPeople(newPeople)
    // Clear shared items if people count shrinks and affects existing sharers
    setSharedItems((prevSharedItems) =>
      prevSharedItems.map((item) => ({
        ...item,
        sharedBy: item.sharedBy.filter((sharerId) => newPeople.some((p) => p.id === sharerId)),
      })),
    )
  }, [numPeople])

  // Handle change for individual person's name or number of items
  const handlePersonChange = (index, field, value) => {
    const updatedPeople = [...people]
    if (field === "numberOfItems") {
      const num = Number.parseInt(value) || 0
      updatedPeople[index].numberOfItems = num
      // Initialize itemCosts array with empty strings based on new number of items
      updatedPeople[index].itemCosts = Array.from({ length: num }, (_, i) => updatedPeople[index].itemCosts[i] || "")
    } else {
      updatedPeople[index][field] = value
    }
    setPeople(updatedPeople)
  }

  // Handle change for a specific item cost for a person
  const handleIndividualItemCostChange = (personIndex, itemCostIndex, value) => {
    const updatedPeople = [...people]
    updatedPeople[personIndex].itemCosts[itemCostIndex] = value
    setPeople(updatedPeople)
  }

  // Add a new shared item
  const addSharedItem = () => {
    setSharedItems([...sharedItems, { id: `shared-${Date.now()}`, itemName: "", itemCost: "", sharedBy: [] }])
  }

  // Handle change for shared item details
  const handleSharedItemChange = (index, field, value) => {
    const updatedSharedItems = [...sharedItems]
    updatedSharedItems[index][field] = value
    setSharedItems(updatedSharedItems)
  }

  // Handle toggling sharedBy for a shared item
  const toggleSharedBy = (itemIndex, personId) => {
    const updatedSharedItems = [...sharedItems]
    const sharedByList = updatedSharedItems[itemIndex].sharedBy
    if (sharedByList.includes(personId)) {
      updatedSharedItems[itemIndex].sharedBy = sharedByList.filter((id) => id !== personId)
    } else {
      updatedSharedItems[itemIndex].sharedBy = [...sharedByList, personId]
    }
    setSharedItems(updatedSharedItems)
  }

  // Remove a shared item
  const removeSharedItem = (idToRemove) => {
    setSharedItems(sharedItems.filter((item) => item.id !== idToRemove))
  }

  // Main calculation logic
  const calculateBill = () => {
    const bill = Number.parseFloat(totalBill) || 0
    const tax = Number.parseFloat(taxCharges) || 0

    if (numPeople === 0) {
      setCalculationResults(null)
      return
    }

    const results = {}

    if (splitOption === "evenly") {
      const totalPerPerson = (bill + tax) / numPeople
      people.forEach((person, index) => {
        results[person.id] = {
          name: person.name || `Person ${index + 1}`,
          amount: totalPerPerson.toFixed(2),
          breakdown: {
            totalBillShare: (bill / numPeople).toFixed(2),
            taxShare: (tax / numPeople).toFixed(2),
          },
        }
      })
    } else {
      // splitOption === 'contributed'
      const individualContributions = {}

      people.forEach((person) => {
        const personTotalItemsCost = person.itemCosts.reduce((sum, cost) => sum + (Number.parseFloat(cost) || 0), 0)
        individualContributions[person.id] = personTotalItemsCost
      })

      sharedItems.forEach((item) => {
        const cost = Number.parseFloat(item.itemCost) || 0
        if (item.sharedBy.length > 0) {
          const costPerSharer = cost / item.sharedBy.length
          item.sharedBy.forEach((sharerId) => {
            individualContributions[sharerId] = (individualContributions[sharerId] || 0) + costPerSharer
          })
        }
      })

      const taxPerPerson = tax / numPeople

      people.forEach((person, index) => {
        const individualShare = individualContributions[person.id] || 0

        results[person.id] = {
          name: person.name || `Person ${index + 1}`,
          amount: (individualShare + taxPerPerson).toFixed(2),
          breakdown: {
            individualSpending: individualShare.toFixed(2),
            taxShare: taxPerPerson.toFixed(2),
          },
        }
      })
    }
    setCalculationResults(results)
  }

  return (
    <div className="min-h-screen bg-[#0A1931] p-4 sm:p-6 flex items-center justify-center font-sans">
      {/* Inject custom CSS for spinner removal */}
      <style>{spinnerStyles}</style>

      <div className="bg-[#1F2F4C] p-6 rounded-xl shadow-xl w-full max-w-2xl text-white">
        <h1 className="text-3xl font-extrabold text-[#F7DC6F] mb-6 text-center">SplitPay</h1>

        {/* Main Bill & Tax Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="totalBill" className="block text-[#C0C0C0] text-sm font-bold mb-2">
              Total Bill Amount (Rs.)
            </label>
            <input
              type="number"
              id="totalBill"
              className="shadow appearance-none border border-[#4A648A] rounded-lg w-full py-2 px-3 bg-[#0A1931] text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#F7DC6F]"
              value={totalBill}
              onChange={(e) => setTotalBill(e.target.value)}
              placeholder="e.g., 1000.00"
            />
          </div>
          <div>
            <label htmlFor="taxCharges" className="block text-[#C0C0C0] text-sm font-bold mb-2">
              Tax Charges (Rs.)
            </label>
            <input
              type="number"
              id="taxCharges"
              className="shadow appearance-none border border-[#4A648A] rounded-lg w-full py-2 px-3 bg-[#0A1931] text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#F7DC6F]"
              value={taxCharges}
              onChange={(e) => setTaxCharges(e.target.value)}
              placeholder="e.g., 100.00"
            />
          </div>
        </div>

        {/* Number of People Input */}
        <div className="mb-6">
          <label htmlFor="numPeople" className="block text-[#C0C0C0] text-sm font-bold mb-2">
            Number of People
          </label>
          <input
            type="number"
            id="numPeople"
            min="1"
            className="shadow appearance-none border border-[#4A648A] rounded-lg w-full py-2 px-3 bg-[#0A1931] text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#F7DC6F]"
            value={numPeople}
            onChange={(e) => setNumPeople(Math.max(1, Number.parseInt(e.target.value) || 1))}
          />
        </div>

        {/* Split Option */}
        <h2 className="text-xl font-bold text-[#F7DC6F] mb-4">How to Split?</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-[#F7DC6F]"
              name="splitOption"
              value="evenly"
              checked={splitOption === "evenly"}
              onChange={(e) => setSplitOption(e.target.value)}
            />
            <span className="ml-2 text-white">Split Evenly (Total Bill + Tax)</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-[#F7DC6F]"
              name="splitOption"
              value="contributed"
              checked={splitOption === "contributed"}
              onChange={(e) => setSplitOption(e.target.value)}
            />
            <span className="ml-2 text-white">Split by Contribution (Tax Evenly)</span>
          </label>
        </div>

        {/* Conditional Individual Spending Section */}
        {splitOption === "contributed" && (
          <>
            <h2 className="text-xl font-bold text-[#F7DC6F] mb-4">Individual Spending</h2>
            <div className="space-y-6 mb-6">
              {people.map((person, personIndex) => (
                <div key={person.id} className="bg-[#142642] p-4 rounded-lg shadow-inner border border-[#2B4061]">
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <input
                      type="text"
                      className="shadow appearance-none border border-[#4A648A] rounded-lg py-2 px-3 bg-[#0A1931] text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#F7DC6F] flex-1"
                      placeholder={`Person ${personIndex + 1} Name`}
                      value={person.name}
                      onChange={(e) => handlePersonChange(personIndex, "name", e.target.value)}
                    />
                    <input
                      type="number"
                      className="shadow appearance-none border border-[#4A648A] rounded-lg py-2 px-3 bg-[#0A1931] text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#F7DC6F] w-full sm:w-auto"
                      placeholder="Number of Items"
                      value={person.numberOfItems}
                      onChange={(e) => handlePersonChange(personIndex, "numberOfItems", e.target.value)}
                      min="0"
                    />
                  </div>
                  {/* Individual Item Cost Inputs */}
                  {person.numberOfItems > 0 && (
                    <div className="mt-4 border-t border-[#2B4061] pt-4">
                      <p className="text-[#C0C0C0] text-sm font-semibold mb-2">
                        {person.name || `Person ${personIndex + 1}`}
                        {"'s Item Costs (Rs.):"}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Array.from({ length: person.numberOfItems }).map((_, itemCostIndex) => (
                          <input
                            key={`${person.id}-item-${itemCostIndex}`}
                            type="number"
                            className="shadow appearance-none border border-[#4A648A] rounded-lg py-2 px-3 bg-[#0A1931] text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#F7DC6F]"
                            placeholder={`Item ${itemCostIndex + 1}`}
                            value={person.itemCosts[itemCostIndex] || ""}
                            onChange={(e) => handleIndividualItemCostChange(personIndex, itemCostIndex, e.target.value)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Shared Items Section */}
        <h2 className="text-xl font-bold text-[#F7DC6F] mb-4">Shared Items</h2>
        <div className="space-y-4 mb-6">
          {sharedItems.map((item, itemIndex) => (
            <div key={item.id} className="bg-[#142642] p-4 rounded-lg shadow-inner border border-[#2B4061]">
              <div className="flex justify-between items-center mb-3">
                <input
                  type="text"
                  className="shadow appearance-none border border-[#4A648A] rounded-lg py-2 px-3 bg-[#0A1931] text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#F7DC6F] flex-grow mr-2"
                  placeholder="Item Name (e.g., Pizza)"
                  value={item.itemName}
                  onChange={(e) => handleSharedItemChange(itemIndex, "itemName", e.target.value)}
                />
                <input
                  type="number"
                  className="shadow appearance-none border border-[#4A648A] rounded-lg py-2 px-3 bg-[#0A1931] text-white leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#F7DC6F] w-24"
                  placeholder="Cost"
                  value={item.itemCost}
                  onChange={(e) => handleSharedItemChange(itemIndex, "itemCost", e.target.value)}
                />
                <button
                  onClick={() => removeSharedItem(item.id)}
                  className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                >
                  &times;
                </button>
              </div>
              <p className="text-[#C0C0C0] text-sm mb-2">Who shared this item?</p>
              <div className="flex flex-wrap gap-2">
                {people.map((person) => (
                  <label key={person.id} className="flex items-center text-sm text-white cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-[#F7DC6F] rounded-md focus:ring-[#F7DC6F] mr-1"
                      checked={item.sharedBy.includes(person.id)}
                      onChange={() => toggleSharedBy(itemIndex, person.id)}
                    />
                    {person.name || `Person ${person.id.split("-")[1] + 1}`}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={addSharedItem}
            className="bg-[#F7DC6F] hover:bg-[#FFD700] text-[#0A1931] font-bold py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Add Shared Item
          </button>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateBill}
          className="bg-[#3D5B99] hover:bg-[#4A6FA7] text-white font-bold py-3 px-6 rounded-lg w-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg mb-6"
        >
          Calculate Bill
        </button>

        {/* Results Section */}
        {calculationResults && (
          <div className="bg-[#142642] p-6 rounded-lg shadow-inner border border-[#2B4061]">
            <h2 className="text-2xl font-bold text-[#F7DC6F] mb-4 text-center">Summary</h2>
            {Object.values(calculationResults).map((person) => (
              <div
                key={person.name}
                className="flex justify-between items-center py-2 border-b border-[#2B4061] last:border-b-0"
              >
                <span className="text-lg font-medium text-white">{person.name}:</span>
                <span className="text-xl font-bold text-[#F7DC6F]">Rs. {person.amount}</span>
              </div>
            ))}
            <div className="mt-4 text-sm text-[#C0C0C0]">
              {Object.values(calculationResults).map((person) => (
                <div key={`breakdown-${person.name}`} className="mb-1">
                  <span className="font-semibold">{person.name}:</span>
                  {splitOption === "evenly" ? (
                    <>
                      {" Bill Share: Rs. "}
                      {person.breakdown.totalBillShare}
                      {", Tax Share: Rs. "}
                      {person.breakdown.taxShare}
                    </>
                  ) : (
                    <>
                      {" Individual/Shared: Rs. "}
                      {person.breakdown.individualSpending}
                      {", Tax Share: Rs. "}
                      {person.breakdown.taxShare}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
