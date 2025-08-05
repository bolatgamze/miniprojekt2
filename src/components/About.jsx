import React from 'react';

/*
die infos über simba und rufus fehlen
 */
const pets = [
    {
        name: 'Gandalf',
        img: 'gandalfa.PNG',
        age: 6,
        species: 'Katze',
        breed: 'Britisch Kurzhaar',
        location: 'Niedernhausen',
        story: 'Gandalf ist ein echter Einzelgänger: Er genießt es, in Ruhe zu dösen, meidet Menschenmassen und kann Hunde kaum ausstehen.'
    },
    {
        name: 'Loki',
        img: 'lokia.PNG',
        age: 3,
        species: 'Hund',
        breed: 'Labrador',
        location: 'Niedernhausen',
        story: 'Loki kann nie lange stillsitzen: Er stiehlt Socken, arrangiert Kissenstapel im Blog und protestiert lautstark, wenn er keinen Applaus bekommt.'
    },
    {
        name: 'Simba',
        img: 'simbaa.PNG',
        age: '2',
        species: 'Kater',
        breed: 'Britisch Kurzhaar',
        location: 'Münster',
        story: 'Simba ist der perfekte Lernbegleiter: Er sitzt gerne neben seinem Menschen beim Programmierkurs, beobachtet alles aufmerksam und scheint jedes Detail verstehen zu wollen.' +
            'Neugier und Lernfreude machen ihn zu einem wahren Coding-Kater.'
    },
    {
        name: 'Rufus',
        img: 'rufusa.PNG',
        age: '10',
        species: 'Hund',
        breed: 'Chihuahua-Papillon-Mischling',
        location: 'Münster',
        story: 'Rufus ist ein quirliger Chihuahua-Papillon-Mischling, der gerne kuschelt und viel schläft. Besonders lieb hat er seine Kuscheltiere, die er manchmal mit viel Eifer "verändert", indem er ihnen Körperteile amputiert. Trotz seiner Niedlichkeit ist er ein aufmerksamer Wachhund, der stets ein Auge auf alles hat, was um ihn herum passiert. '
    }
];

function About() {
    const coral = '#FF7F50';

    const containerStyle = {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };
    const titleStyle = {
        textAlign: 'center',
        marginBottom: '30px',
        color: coral,
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontWeight: 'bold'
    };
    const cardStyle = {
        width: '260px',
        border: `2px solid ${coral}`,
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        backgroundColor: '#fff',
        transition: 'transform 0.2s'
    };
    const imgStyle = {
        width: '100%',
        height: '350px'
    };
    const contentStyle = {
        padding: '15px',
        lineHeight: '1.5',
        fontSize: '0.95rem',
        color: '#333'
    };
    const nameStyle = {
        margin: '10px 0',
        color: coral,
        fontSize: '1.4rem'
    };

    return (
        <div className="about-container" style={containerStyle}>
            <h1 style={titleStyle}>Pfoten hinter dem Blog</h1>
            <div className="cards-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center' }}>
                {pets.map((pet) => (
                    <div
                        key={pet.name}
                        className="pet-card"
                        style={cardStyle}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                    >
                        <img src={`/about/${pet.img}`} alt={pet.name} style={imgStyle} />
                        <div style={contentStyle}>
                            <h2 style={nameStyle}>{pet.name}</h2>
                            {pet.age && <p><strong>Alter:</strong> {pet.age}</p>}
                            {pet.species && <p><strong>Art:</strong> {pet.species}</p>}
                            {pet.breed && <p><strong>Rasse:</strong> {pet.breed}</p>}
                            {pet.location && <p><strong>Ort:</strong> {pet.location}</p>}
                            {pet.story && <p style={{ fontStyle: 'italic', marginTop: '10px' }}>{pet.story}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;
