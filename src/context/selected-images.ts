type SelectedImagesContext = {
    addCard: (card: HTMLElement) => void;
    removeCard: (card: HTMLElement) => void;
    getSelectedElements: () => HTMLElement[];
    getSelectedElementsSet: () => Set<HTMLElement>;
    getCount: () => number;
}

// Global state
let selectedCards = new Set<HTMLElement>();

export const useSelectedImages = (): SelectedImagesContext => ({
    addCard: (card: HTMLElement) => selectedCards.add(card),
    removeCard: (card: HTMLElement) => selectedCards.delete(card),
    getSelectedElements: () => Array.from(selectedCards),
    getSelectedElementsSet: () => selectedCards,
    getCount: () => selectedCards.size,
})