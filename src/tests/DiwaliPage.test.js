import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DiwaliPage from '../components/DiwaliPage';

// Mock HTMLMediaElement methods (to prevent errors when calling play/pause)
beforeAll(() => {
  HTMLMediaElement.prototype.play = jest.fn();
  HTMLMediaElement.prototype.pause = jest.fn();
});

describe('🎇 DiwaliPage Component Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });


  // ────────────────────────────────
  // 2️⃣ Toast Functionality
  // ────────────────────────────────
  test('shows toast when "Send Wishes" is clicked and disappears after 2200ms', () => {
    render(<DiwaliPage />);
    fireEvent.click(screen.getByText('Send Wishes'));
    expect(screen.getByText('Wishing you a joyful Diwali!')).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(2200));
    expect(screen.queryByText('Wishing you a joyful Diwali!')).not.toBeInTheDocument();
  });

  test('replaces toast if another button is clicked before timeout', () => {
    render(<DiwaliPage />);
    fireEvent.click(screen.getByText('Light Diyas'));
    expect(screen.getByText('Lights turned on ✨')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Launch Fireworks'));
    expect(screen.getByText('Fireworks ready 🎇')).toBeInTheDocument();
    expect(screen.queryByText('Lights turned on ✨')).not.toBeInTheDocument();
  });

  // ────────────────────────────────
  // 3️⃣ Music Toggle Logic
  // ────────────────────────────────
  test('shows "No music file found" toast when no src is available', () => {
    render(<DiwaliPage />);
    const audio = document.getElementById('bgMusic');
    audio.removeAttribute('src'); // simulate missing file

    fireEvent.click(screen.getByText('Play Music'));
    expect(screen.getByText(/No music file found/i)).toBeInTheDocument();
  });

  test('plays and pauses music correctly with toast updates', () => {
    render(<DiwaliPage />);
    const playButton = screen.getByText('Play Music');

    // Simulate valid audio source
    const audio = document.getElementById('bgMusic');
    audio.src = 'diwali-music.mp3';

    // Play music
    fireEvent.click(playButton);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(screen.getByText('Music playing 🎶')).toBeInTheDocument();
    expect(screen.getByText('Pause Music')).toBeInTheDocument();

    // Pause music
    fireEvent.click(screen.getByText('Pause Music'));
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(screen.getByText('Music paused')).toBeInTheDocument();
    expect(screen.getByText('Play Music')).toBeInTheDocument();
  });

  // ────────────────────────────────
  // 4️⃣ Button Interactions
  // ────────────────────────────────
  test.each([
    ['Light Diyas', 'Lights turned on ✨'],
    ['Launch Fireworks', 'Fireworks ready 🎇'],
    ['RSVP', 'RSVP recorded'],
    ['Get Directions', 'Directions opened']
  ])('clicking "%s" shows toast "%s"', (buttonLabel, expectedToast) => {
    render(<DiwaliPage />);
    fireEvent.click(screen.getByText(buttonLabel));
    expect(screen.getByText(expectedToast)).toBeInTheDocument();
  });
});
