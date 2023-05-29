describe('Podcaster app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  it('homepage_can_be_opened', () => {
    cy.get('[data-testid="home-button"]').should('be.visible')
    cy.get('input').should('be.visible')
    cy.get('input').type('test')
  })

  it('should_be_able_to_navigate_to_a_podcast_from_home_page_play_audio_wait_12_seconds_and_go_back_to_hompage', () => {
    cy.visit('http://localhost:5173/')
    cy.get('img').first().click()
    cy.get('[data-testid="episode-row"]', { timeout: 1000000 }).first().click()
    cy.get('audio').then((audio) => {
      audio[0].play()
    })
    cy.wait(12000)
    cy.get('audio').then((audio) => {
      audio[0].pause()
    })
    cy.get('img').first().click()
    cy.wait(1000)
    cy.get('[data-testid="home-button"]').click()
  })
})
